package org.project.uh.room.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.project.uh.room.dto.RoomDto;
import org.project.uh.util.PasswordHashUtil;
import org.project.uh.util.RandomNumberUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	private Map<String, RoomDto> roomList = new ConcurrentHashMap<>();

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
			newRoom.setSessionId(session.getSessionId());

			//방 설정
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

	//방 나감처리 - connection 해제
	@PostMapping("/exitrooms/{sessionId}/{connectionId}")
	public ResponseEntity<String> removeConnection(@PathVariable("sessionId") String sessionId,
		@PathVariable("connectionId") String connectionId) {
		RoomDto roomDto = roomList.get(sessionId);
		if (roomDto != null) {
			// 세션 참가자가 나갈 때 count 감소
			roomDto.setCount(roomDto.getCount() - 1);

			// count가 0이 되면 방 제거
			if (roomDto.getCount() == 0) {
				roomList.remove(sessionId);
			}
			// 세션 참가자가 나갔을 때의 추가 처리 수행
			return new ResponseEntity<>("방을 나갔습니다.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.BAD_REQUEST);
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
}
