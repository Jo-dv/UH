package org.project.uh.room.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.project.uh.game.dto.QuizDto;
import org.project.uh.game.service.GameService;
import org.project.uh.room.RoomService;
import org.project.uh.room.dto.AddPlayerDto;
import org.project.uh.room.dto.CheckPasswordDto;
import org.project.uh.room.dto.MoveTeamDto;
import org.project.uh.room.dto.PlayerDto;
import org.project.uh.room.dto.ReadyDto;
import org.project.uh.room.dto.RoomDetailsDto;
import org.project.uh.room.dto.RoomDto;
import org.project.uh.room.dto.RoomStatusDto;
import org.project.uh.room.dto.SetPlayDto;
import org.project.uh.room.dto.TransferHostDto;
import org.project.uh.user.dto.UserDto;
import org.project.uh.util.PasswordHashUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api", produces = "application/json; charset=UTF8")
@Tag(name = "방 api")
public class RoomController {

	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	private final RoomService roomService;

	private final GameService gameService;

	// 방 관리
	//방 리스트 (sessionId,방 정보)
	private final Map<String, RoomDto> roomList = new ConcurrentHashMap<>();

	//방 상태 정보 리스트(sessionId,방 상태)
	private final Map<String, RoomStatusDto> roomStatusList = new ConcurrentHashMap<>();

	//게임 시작 시에 퀴즈 목록
	private final Map<String, List<QuizDto>> quizList = new ConcurrentHashMap<>();

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	//방 만들기, 입장 관리
	@Operation(
		summary = "방만들기/입장",
		description = "sessionId의 값으로 create가 넘어오면 방 생성<br>"
			+ "방의 세션id가 넘어오면 방 입장으로 처리<br>"
			+ "얻은 세션id로 오픈비두 토큰 생성 필요. "
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "400", description = "인원 초과"),
		@ApiResponse(responseCode = "401", description = "로그인 정보가 없습니다."),
		@ApiResponse(responseCode = "404", description = "이미 시작된 방"),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PostMapping("/rooms")
	public ResponseEntity<String> initializeSession(@RequestBody RoomDto roomDto,
		HttpSession httpSession) {
		//방 만들기/입장(입장할 방 ID)
		String sessionId = roomDto.getSessionId();

		//방을 만드는 경우
		if (sessionId.equals("create")) {
			try {
				String roomId = roomService.createRoom(openvidu, roomDto, roomList);
				//session 에 현재 참여중인 방 정보 입력
				httpSession.setAttribute("roomId", roomId);
				return new ResponseEntity<>(roomId, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		//방을 입장하는 경우
		else {
			try {
				String result = roomService.enterRoom(roomList.get(sessionId));
				if (result.equals("인원초과"))
					return new ResponseEntity<>("인원초과", HttpStatus.BAD_REQUEST);
				else if (result.equals("시작된방")) {
					return new ResponseEntity<>("이미 시작된 방", HttpStatus.NOT_FOUND);
				} else {
					//session 에 현재 참여중인 방 정보 입력
					httpSession.setAttribute("roomId", sessionId);
					return new ResponseEntity<>(sessionId, HttpStatus.OK);
				}
			} catch (Exception e) {
				return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	//토큰 받아오기
	@Operation(
		summary = "오픈비두 토큰 생성",
		description = "sessionId의 값으로 토큰 생성"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "토큰 값을 성공적으로 불러왔습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PostMapping("/tokens/{sessionId}")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
		@RequestBody(required = false) Map<String, Object> params)
		throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openvidu.getActiveSession(sessionId);

		if (session == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}

	//방 목록 불러오기
	@Operation(
		summary = "방 목록"
	)
	@GetMapping("/rooms")
	public ResponseEntity<List<RoomDto>> listRoom() {
		List<RoomDto> rooms = new ArrayList<>(roomList.values());
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

	//방 상세 정보 불러오기(입장했을 때)
	@Operation(
		summary = "방 상세 정보",
		description = "방에 입장 했을 때 방의 상세 정보를 보냄"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "방 정보를 불러왔습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping("/rooms/{sessionId}")
	public ResponseEntity<RoomDetailsDto> detailRoom(@PathVariable String sessionId) {
		RoomDto roomData = roomList.get(sessionId);
		RoomStatusDto roomStatus = roomStatusList.get(sessionId);
		if (roomData == null || roomStatus == null) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		RoomDetailsDto roomDetails = new RoomDetailsDto();
		roomDetails.setRoomData(roomData);
		roomDetails.setRoomStatus(roomStatus);

		return new ResponseEntity<>(roomDetails, HttpStatus.OK);
	}

	// 방 설정 변경
	@Operation(
		summary = "방 설정 변경"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "방 설정이 변경되었습니다."),
		@ApiResponse(responseCode = "400", description = "현재 인원이 설정한 최대 인원보다 많습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PutMapping("/rooms")
	public ResponseEntity<String> updateRoomSettings(@RequestBody RoomDto afterRoom) {
		String sessionId = afterRoom.getSessionId();
		RoomDto beforeRoom = roomList.get(sessionId);
		//예외처리
		if (beforeRoom == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		String result = roomService.updateRoomSettings(beforeRoom, afterRoom);
		if (result.equals("변경"))
			return new ResponseEntity<>("방 설정이 변경되었습니다.", HttpStatus.OK);
		else
			return new ResponseEntity<>("현재 인원이 설정한 최대 인원보다 많습니다.", HttpStatus.BAD_REQUEST);
	}

	//방 나감처리 - connection 해제
	@Operation(
		summary = "방 나감",
		description = "방 나감 처리를 하고 방에 사람이 없을 시 방 삭제<br>"
			+ "방장이 나갈 시에 방장 권한을 넘기는 처리 진행<br>"
			+ "오픈비두 연결 해제"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "방을 나갔습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@DeleteMapping("/exitrooms/{sessionId}/{connectionId}")
	public ResponseEntity<String> removeConnection(@PathVariable("sessionId") String sessionId,
		@PathVariable("connectionId") String connectionId, HttpSession httpSession) {
		RoomDto roomDto = roomList.get(sessionId);

		//예외처리
		if (roomDto == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		//session에서 방 정보 제거
		httpSession.removeAttribute("roomId");

		// count가 0이 되면 방 제거
		if (roomDto.getCount() == 1) {
			roomList.remove(sessionId);
			roomStatusList.remove(sessionId);
			return new ResponseEntity<>("방이 삭제됐습니다.", HttpStatus.OK);
		}

		//방이 남아있는 경우
		else {
			RoomStatusDto roomStatus = roomStatusList.get(sessionId);
			roomService.exitRooms(roomDto, roomStatus, connectionId);
			return new ResponseEntity<>("방을 나갔습니다.", HttpStatus.OK);
		}
	}

	//방 비밀번호 일치 여부 확인
	@Operation(
		summary = "비밀번호 확인",
		description = "유저가 입장할 때 방의 비밀번호와 입력 비밀번호를 비교/확인"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "비밀번호 일치/불일치"),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PostMapping("/password")
	public ResponseEntity<Boolean> checkPassword(@RequestBody CheckPasswordDto checkPasswordDto) {
		String sessionId = checkPasswordDto.getSessionId();
		RoomDto room = roomList.get(sessionId);

		//예외처리
		if (room == null) {
			return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		String roomPassword = room.getRoomPassword();//방 비밀번호
		String enterPassword = checkPasswordDto.getEnterPassword();//입력 비밀번호

		//null이 아니면 비밀번호 해싱 후 비교
		if (enterPassword != null)
			enterPassword = PasswordHashUtil.hashPassword(enterPassword);

		if (!roomPassword.equals(enterPassword)) {
			return new ResponseEntity<>(false, HttpStatus.OK);
		}
		return new ResponseEntity<>(true, HttpStatus.OK);
	}

	// 방 이름 및 게임 종류로 검색
	@Operation(
		summary = "방 검색",
		description = "키워드와 게임 종류를 기준으로 방을 검색"
	)
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
	@Operation(
		summary = "플레이어 입장",
		description = "sessionId, connectionId, isHost를 받고<br>"
			+ "플레이어 정보를 저장 후 방 상태 변경"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "방에 입장했습니다."),
		@ApiResponse(responseCode = "401", description = "로그인 정보가 없습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PostMapping("/players")
	public ResponseEntity<String> addPlayer(@RequestBody AddPlayerDto addDto,
		@SessionAttribute(name = "user") UserDto user) {
		boolean isHost = addDto.isHost();
		String sessionId = addDto.getSessionId();

		//방장 설정
		if (isHost) {
			roomStatusList.put(sessionId, roomService.addHostPlayer(addDto, user));
		}
		//일반 플레이어 설정
		else {
			RoomStatusDto roomStatus = roomStatusList.get(sessionId);

			//예외처리
			if (roomStatus == null) {
				return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			roomService.addPlayer(roomStatus, addDto, user);
			System.out.println(roomStatus);
		}

		return new ResponseEntity<>("방에 입장했습니다.", HttpStatus.OK);
	}

	//팀 변경
	@Operation(
		summary = "팀 변경",
		description = "sessionId, connectionId, team을 받고<br>"
			+ "플레이어의 팀 정보를 변경"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "팀이 변경되었습니다."),
		@ApiResponse(responseCode = "400", description = "현재 팀으로는 변경이 불가능합니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PutMapping("/team")
	public ResponseEntity<String> moveTeam(@RequestBody MoveTeamDto moveTeamDto) {
		String sessionId = moveTeamDto.getSessionId();
		String connectionId = moveTeamDto.getConnectionId();
		String team = moveTeamDto.getTeam();

		RoomStatusDto roomStatus = roomStatusList.get(sessionId);

		//예외처리
		if (roomStatus == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		PlayerDto player = roomStatus.getPlayers().get(connectionId);

		//예외처리
		if (player == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		String result = roomService.moveTeam(roomStatus, player, team);

		if (result.equals("변경"))
			return new ResponseEntity<>("팀이 변경되었습니다.", HttpStatus.OK);
		else
			return new ResponseEntity<>("현재 팀으로는 변경이 불가능합니다.", HttpStatus.BAD_REQUEST);
	}

	//방장 권한 넘겨주기
	@Operation(
		summary = "방장 권한 변경",
		description = "sessionId, connectionId 를 받고<br>"
			+ "방의 방장 정보를 변경"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "방장 권한을 전달했습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PutMapping("/host")
	public ResponseEntity<String> transferHost(@RequestBody TransferHostDto transferHostDto) {
		String sessionId = transferHostDto.getSessionId();
		String connectionId = transferHostDto.getConnectionId();

		RoomStatusDto roomStatus = roomStatusList.get(sessionId);

		//예외처리
		if (roomStatus == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		// 기존 방장 ID를 변경
		roomStatus.setHostId(connectionId);

		return new ResponseEntity<>("방장 권한을 전달했습니다.", HttpStatus.OK);
	}

	@Operation(
		summary = "게임 준비/취소",
		description = "sessionId, connectionId, isReady를 받고<br>"
			+ "방장을 제외한 플레이어들의 준비 상태 변경"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "connectionId"),
		@ApiResponse(responseCode = "400", description = "이미 준비/취소 상태입니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PutMapping("/ready")
	public ResponseEntity<String> updateReady(@RequestBody ReadyDto readyDto) {
		String sessionId = readyDto.getSessionId();
		String connectionId = readyDto.getConnectionId();
		boolean isReady = readyDto.isReady();
		System.out.println(readyDto);
		RoomStatusDto roomStatus = roomStatusList.get(sessionId);
		if (roomStatus == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		PlayerDto player = roomStatus.getPlayers().get(connectionId);
		if (player == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		//준비를 하는 경우
		if (isReady) {
			if (player.isReady())
				return new ResponseEntity<>("이미 준비 상태입니다.", HttpStatus.BAD_REQUEST);
			roomStatus.setReadyCount(roomStatus.getReadyCount() + 1);
			player.setReady(true);
		}
		//준비를 취소하는 경우
		else {
			if (!player.isReady())
				return new ResponseEntity<>("이미 준비 취소 상태입니다.", HttpStatus.BAD_REQUEST);
			roomStatus.setReadyCount(roomStatus.getReadyCount() - 1);
			player.setReady(false);
		}
		return new ResponseEntity<>(connectionId, HttpStatus.OK);
	}

	@Operation(
		summary = "게임 시작/종료",
		description = "게임 시작/종료 처리<br>"
			+ "각 방의 설정에 맞는 문제를 미리 서버에 불러와서 저장한다.<br>"
			+ "게임이 끝날 때에는 결과를 저장한다.<br>"
			+ "종료 시에는 이긴 팀, 양 팀의 스코어를 같이 받는다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "게임이 시작/종료 되었습니다."),
		@ApiResponse(responseCode = "400", description = "인원을 확인해주세요."),
		@ApiResponse(responseCode = "404", description = "팀 인원을 확인해주세요."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근"),
		@ApiResponse(responseCode = "502", description = "준비를 하지 않은 인원이 있습니다.")
	})
	@PutMapping("/play")
	public ResponseEntity<String> gameStatus(@RequestBody SetPlayDto setPlayDto) {
		String sessionId = setPlayDto.getSessionId();
		boolean isPlay = setPlayDto.isPlay();

		RoomDto room = roomList.get(sessionId);
		RoomStatusDto roomStatus = roomStatusList.get(sessionId);

		if (room == null || roomStatus == null) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		Set<String> players = roomStatus.getPlayers().keySet();

		//게임 종료
		if (!isPlay) {
			String winTeam = setPlayDto.getWinTeam();
			int winScore = setPlayDto.getWinScore();
			int loseScore = setPlayDto.getLoseScore();
			room.setPlay(false);

			if (gameService.saveResult(room.getGameCategory(), roomStatus, winTeam, winScore, loseScore) == 1) {
				return new ResponseEntity<>("게임이 종료되었습니다.", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		//게임 시작
		else {
			//시작 조건
			if (room.getCount() < 4) {
				return new ResponseEntity<>("인원을 확인해주세요.", HttpStatus.BAD_REQUEST);
			}
			if (roomStatus.getCountA() != roomStatus.getCountB()) {
				return new ResponseEntity<>("팀 인원을 확인해주세요.", HttpStatus.NOT_FOUND);
			}
			if (roomStatus.getReadyCount() != room.getCount() - 1) {
				return new ResponseEntity<>("준비를 하지 않은 인원이 있습니다.", HttpStatus.BAD_GATEWAY);
			}

			//문제를 불러와서 sessionId별로 저장 후 model에 저장해서 gameController에서 사용
			quizList.put(sessionId, gameService.listQuiz(room.getGameCategory()));
			//게임 시작 할 때 전부 준비 취소 처리
			for (String player : players) {
				roomStatus.getPlayers().get(player).setReady(false);
			}
			roomStatus.setReadyCount(0);

			room.setPlay(true);
			return new ResponseEntity<>("게임이 시작되었습니다.", HttpStatus.OK);
		}
	}

	@Scheduled(fixedRate = 60000)
	public void cleanupInactiveSessions() {
		try {
			openvidu.fetch();
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		System.out.println("클린");
		for (String sessionId : roomList.keySet()) {
			// 해당 세션ID로 유효한 세션이 없으면 방 제거
			Session session = openvidu.getActiveSession(sessionId);
			if (session == null) {
				roomList.remove(sessionId);
				System.out.println("Session closed: " + sessionId);
			}
		}
	}
}
