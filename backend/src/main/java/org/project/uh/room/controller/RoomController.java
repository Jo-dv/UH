package org.project.uh.room.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.project.uh.room.dto.PlayerDto;
import org.project.uh.room.dto.RoomDetailsDto;
import org.project.uh.room.dto.RoomDto;
import org.project.uh.room.dto.RoomStatusDto;
import org.project.uh.util.PasswordHashUtil;
import org.project.uh.util.RandomNumberUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RoomController {

	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	//랜덤 난수 생성
	private final RandomNumberUtil randomNumber = new RandomNumberUtil();

	// 방 관리
	//방 리스트 (sessionId,방 정보)
	private Map<String, RoomDto> roomList = new ConcurrentHashMap<>();
	//방 상태 정보 리스트(sessionId,방 상태)
	private Map<String, RoomStatusDto> roomStatusList = new ConcurrentHashMap<>();

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	//방 만들기, 입장 관리
	@PostMapping("/rooms")
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		//방 만들기/입장(입장할 방 ID)
		String customSessionId = (String)params.get("customSessionId");

		//방을 만드는 경우
		if (customSessionId.equals("create")) {
			//세션명 랜덤난수로 생성
			customSessionId = "room" + randomNumber.create();

			SessionProperties properties = new SessionProperties.Builder().customSessionId(customSessionId).build();
			Session session = openvidu.createSession(properties);
			RoomDto newRoom = new RoomDto();

			//방 설정
			newRoom.setSessionId(session.getSessionId());
			newRoom.setRoomName((String)params.get("roomName"));
			newRoom.setGameCategory((int)params.get("gameCategory"));
			newRoom.setQuizCategory((int)params.get("quizCategory"));
			newRoom.setMax((int)params.get("max"));

			//비밀번호 설정
			String roomPassword = (String)params.get("roomPassword");
			//비밀번호 해싱
			if (roomPassword != null) {
				roomPassword = PasswordHashUtil.hashPassword(roomPassword);
			}
			newRoom.setRoomPassword(roomPassword);

			roomList.put(session.getSessionId(), newRoom);
			return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
		}

		//방을 입장하는 경우
		else {
			RoomDto room = roomList.get(customSessionId);

			//해당 방의 참가자 수를 증가
			room.setCount(room.getCount() + 1);

			// 인원 초과 확인
			if (room.getCount() > room.getMax()) {
				room.setCount(room.getCount() - 1);
				return new ResponseEntity<>("인원초과", HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<>(customSessionId, HttpStatus.OK);
		}
	}

	//토큰 받아오기
	@PostMapping("/tokens/{sessionId}")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openvidu.getActiveSession(sessionId);

		if (session == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.NOT_FOUND);
		}

		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}

	//방 목록 불러오기
	@GetMapping("/rooms")
	public ResponseEntity<List<RoomDto>> listRoom() {
		List<RoomDto> rooms = new ArrayList<>(roomList.values());
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

	//방 상세 정보 불러오기(입장했을 때)
	@GetMapping("/rooms/{sessionId}")
	public ResponseEntity<RoomDetailsDto> detailRoom(@PathVariable String sessionId) {
		RoomDto roomData = roomList.get(sessionId);
		RoomStatusDto roomStatus = roomStatusList.get(sessionId);

		RoomDetailsDto roomDetails = new RoomDetailsDto();
		roomDetails.setRoomData(roomData);
		roomDetails.setRoomStatus(roomStatus);

		return new ResponseEntity<>(roomDetails, HttpStatus.OK);
	}

	// 방 설정 변경
	@PutMapping("/rooms")
	public ResponseEntity<String> updateRoomSettings(@RequestBody Map<String, Object> params) {
		String sessionId = (String)params.get("sessionId");
		String roomName = (String)params.get("roomName");
		String roomPassword = (String)params.get("roomPassword");
		int gameCategory = (int)params.get("gameCategory");
		int quizCategory = (int)params.get("quizCategory");
		int max = (int)params.get("max");
		RoomDto room = roomList.get(sessionId);

		//방 설정 변경
		room.setRoomName(roomName);
		room.setGameCategory(gameCategory);
		room.setQuizCategory(quizCategory);
		room.setMax(max);

		// 비밀번호 해싱
		if (roomPassword != null) {
			roomPassword = PasswordHashUtil.hashPassword(roomPassword);
		}
		room.setRoomPassword(roomPassword);

		System.out.println(roomList);
		return new ResponseEntity<>("방 설정이 변경되었습니다.", HttpStatus.OK);
	}

	//방 나감처리 - connection 해제
	@DeleteMapping("/exitrooms/{sessionId}/{connectionId}")
	public ResponseEntity<String> removeConnection(@PathVariable("sessionId") String sessionId,
		@PathVariable("connectionId") String connectionId) {
		RoomDto roomDto = roomList.get(sessionId);

		// count가 0이 되면 방 제거
		if (roomDto.getCount() == 1) {
			roomList.remove(sessionId);
			roomStatusList.remove(sessionId);

			return new ResponseEntity<>("방이 삭제됐습니다.", HttpStatus.OK);
		}

		//방이 남아있는 경우
		else {
			RoomStatusDto roomStatus = roomStatusList.get(sessionId);
			PlayerDto player = roomStatus.getPlayers().get(connectionId);

			// 플레이어가 나갈 때 count 감소
			roomDto.setCount(roomDto.getCount() - 1);

			if (player.getTeam().equals("A")) {
				roomStatus.setCountA(roomStatus.getCountA() - 1);
			} else {
				roomStatus.setCountB(roomStatus.getCountB() - 1);
			}

			if (player.isReady()) {
				roomStatus.setReadyCount(roomStatus.getReadyCount() - 1);
			}

			//나가는 사람이 방장인 경우
			if (roomStatus.getHostId().equals(connectionId)) {
				Set<String> nextHost = roomStatus.getPlayers().keySet();
				for (String s : nextHost) {
					if (!s.equals(connectionId)) {
						roomStatus.setHostId(s);
					}
				}
			}

			roomStatus.getPlayers().remove(connectionId);

			return new ResponseEntity<>("방을 나갔습니다.", HttpStatus.OK);
		}
	}

	//방 비밀번호 일치 여부 확인
	@PostMapping("/password")
	public ResponseEntity<Boolean> checkPassword(@RequestBody(required = false) Map<String, String> params) {
		String customSessionId = params.get("customSessionId");
		RoomDto room = roomList.get(customSessionId);

		String roomPassword = room.getRoomPassword();//방 비밀번호
		String enterPassword = params.get("enterPassword");//입력 비밀번호

		//null이 아니면 비밀번호 해싱 후 비교
		if (enterPassword != null)
			enterPassword = PasswordHashUtil.hashPassword(enterPassword);

		if (!roomPassword.equals(enterPassword)) {
			return new ResponseEntity<>(false, HttpStatus.OK);
		}
		return new ResponseEntity<>(true, HttpStatus.OK);
	}

	// 방 이름 및 게임 종류로 검색
	@GetMapping("/searchrooms")
	public ResponseEntity<List<RoomDto>> searchRoom(
		@RequestParam(required = false) String keyword,
		@RequestParam(required = false) Integer game) {

		// 방 검색 결과를 저장할 리스트
		List<RoomDto> searchResults = new ArrayList<>();

		// 모든 방을 순회하면서 검색 조건에 맞는 방을 찾음
		for (RoomDto room : roomList.values()) {
			// 방 이름이나 게임 종류 중 하나라도 검색 조건에 맞으면 결과 리스트에 추가
			if ((keyword == null || room.getRoomName().contains(keyword))
				&& (game == null || room.getGameCategory() == game)) {
				searchResults.add(room);
			}
		}
		return new ResponseEntity<>(searchResults, HttpStatus.OK);
	}

	//플레이어 설정
	@PostMapping("/players")
	public ResponseEntity<String> hostPlayer(@RequestBody Map<String, Object> params) {
		String sessionId = (String)params.get("sessionId");
		String connectionId = (String)params.get("connectionId");
		int userSeq = (int)params.get("userSeq");
		String userNickname = (String)params.get("userNickname");
		boolean isHost = (boolean)params.get("isHost");

		//플레이어 설정
		PlayerDto newPlayer = new PlayerDto();
		newPlayer.setUserSeq(userSeq);
		newPlayer.setUserNickname(userNickname);

		//방장 설정
		if (isHost) {
			newPlayer.setTeam("A");

			//방 상태 설정
			RoomStatusDto newRoomStatus = new RoomStatusDto();
			newRoomStatus.setHostId(connectionId);
			newRoomStatus.getPlayers().put(connectionId, newPlayer);
			roomStatusList.put(sessionId, newRoomStatus);
			System.out.println(newRoomStatus);
		} else {

			//일반 플레이어 설정
			RoomStatusDto roomStatus = roomStatusList.get(sessionId);

			//인원별 팀 설정
			int countA = roomStatus.getCountA();
			int countB = roomStatus.getCountB();
			if (countA > countB) {
				newPlayer.setTeam("B");
				roomStatus.setCountB(roomStatus.getCountB() + 1);
			} else {
				newPlayer.setTeam("A");
				roomStatus.setCountA(roomStatus.getCountA() + 1);
			}
			roomStatus.getPlayers().put(connectionId, newPlayer);
			System.out.println(roomStatus);
		}

		return new ResponseEntity<>("방에 입장했습니다.", HttpStatus.OK);
	}

	//팀 변경
	@PutMapping("/team")
	public ResponseEntity<String> changePlayerTeamA(@RequestBody Map<String, String> params) {
		String sessionId = params.get("sessionId");
		String connectionId = params.get("connectionId");
		String team = params.get("team");

		RoomStatusDto roomStatus = roomStatusList.get(sessionId);
		PlayerDto player = roomStatus.getPlayers().get(connectionId);

		//A팀으로 변경하는 경우
		if (team.equals("A")) {
			roomStatus.setCountA(roomStatus.getCountA() + 1);
			roomStatus.setCountB(roomStatus.getCountB() - 1);
			player.setTeam("A");
		}
		//B팀으로 변경하는 경우
		else {
			roomStatus.setCountB(roomStatus.getCountB() + 1);
			roomStatus.setCountA(roomStatus.getCountA() - 1);
			player.setTeam("B");
		}

		return new ResponseEntity<>("팀이 변경되었습니다.", HttpStatus.OK);
	}

	//방장 권한 넘겨주기
	@PutMapping("/host")
	public ResponseEntity<String> transferHost(@RequestBody Map<String, String> params) {
		String sessionId = params.get("sessionId");
		String connectionId = params.get("connectionId");

		RoomStatusDto roomStatus = roomStatusList.get(sessionId);

		// 기존 방장 ID를 변경
		roomStatus.setHostId(connectionId);

		return new ResponseEntity<>("방장 권한을 전달했습니다.", HttpStatus.OK);
	}

	@PutMapping("/ready")
	public ResponseEntity<String> updateReady(@RequestBody Map<String, Object> params) {
		String sessionId = (String)params.get("sessionId");
		String connectionId = (String)params.get("connectionId");
		boolean isReady = (boolean)params.get("isReady");

		RoomStatusDto roomStatus = roomStatusList.get(sessionId);
		PlayerDto player = roomStatus.getPlayers().get(connectionId);

		//준비를 하는 경우
		if (isReady) {
			roomStatus.setReadyCount(roomStatus.getReadyCount() + 1);
			player.setReady(true);
		}
		//준비를 취소하는 경우
		else {
			roomStatus.setReadyCount(roomStatus.getReadyCount() - 1);
			player.setReady(false);
		}
		return new ResponseEntity<>("준비 상태를 변경했습니다.", HttpStatus.OK);
	}

	@PutMapping("/play")
	public ResponseEntity<String> gameStart(@RequestBody Map<String, Object> params) {
		String sessionId = (String)params.get("sessionId");
		boolean isPlay = (boolean)params.get("isPlay");

		RoomDto room = roomList.get(sessionId);

		//게임 종료
		if (!isPlay) {
			room.setPlay(false);
			return new ResponseEntity<>("게임이 종료되었습니다.", HttpStatus.OK);
		}
		//게임 시작
		else {
			RoomStatusDto roomStatus = roomStatusList.get(sessionId);
			Set<String> players = roomStatus.getPlayers().keySet();

			//시작 조건
			if (room.getCount() < 4) {
				return new ResponseEntity<>("인원을 확인해주세요.", HttpStatus.NOT_FOUND);
			}
			if (roomStatus.getCountA() != roomStatus.getCountB()) {
				return new ResponseEntity<>("팀 인원을 확인해주세요", HttpStatus.BAD_REQUEST);
			}
			if (roomStatus.getReadyCount() != room.getCount() - 1) {
				return new ResponseEntity<>("준비를 하지 않은 인원이 있습니다.", HttpStatus.BAD_GATEWAY);
			}

			//게임 시작 할 때 전부 준비 취소 처리
			for (String player : players) {
				roomStatus.getPlayers().get(player).setReady(false);
			}
			roomStatus.setReadyCount(0);

			room.setPlay(true);
			return new ResponseEntity<>("게임이 시작되었습니다.", HttpStatus.OK);
		}
	}
}
