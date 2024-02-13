package org.project.uh.room;

import java.util.Map;
import java.util.Set;

import org.project.uh.room.dto.AddPlayerDto;
import org.project.uh.room.dto.PlayerDto;
import org.project.uh.room.dto.RoomDto;
import org.project.uh.room.dto.RoomStatusDto;
import org.project.uh.user.dto.UserDto;
import org.project.uh.util.PasswordHashUtil;
import org.project.uh.util.RandomNumberUtil;
import org.springframework.stereotype.Service;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@Service
public class RoomServiceImpl implements RoomService {

	@Override
	public String createRoom(OpenVidu openvidu, RoomDto roomDto, Map<String, RoomDto> roomList) throws
		OpenViduJavaClientException,
		OpenViduHttpException {
		//세션명 랜덤난수로 생성
		String sessionId = "room" + RandomNumberUtil.create();

		SessionProperties properties = new SessionProperties.Builder().customSessionId(sessionId).build();
		Session session = openvidu.createSession(properties);

		//방 설정
		roomDto.setSessionId(session.getSessionId());

		//비밀번호 설정
		String roomPassword = roomDto.getRoomPassword();
		//비밀번호 해싱
		if (roomPassword != null) {
			roomPassword = PasswordHashUtil.hashPassword(roomPassword);
		}
		roomDto.setRoomPassword(roomPassword);

		roomList.put(session.getSessionId(), roomDto);
		return session.getSessionId();
	}

	@Override
	public String enterRoom(RoomDto room) {
		// 인원 초과 확인
		if (room.getCount() == room.getMax()) {
			return "인원초과";
		}

		//게임 시작 확인
		if (room.isPlay()) {
			return "시작된방";
		}

		//해당 방의 참가자 수를 증가
		room.setCount(room.getCount() + 1);
		return room.getSessionId();
	}

	@Override
	public String updateRoomSettings(RoomDto beforeRoom, RoomDto afterRoom) {
		String roomPassword = afterRoom.getRoomPassword();
		int max = afterRoom.getMax();
		if (beforeRoom.getCount() > max)
			return "초과";

		//방 설정 변경
		beforeRoom.setRoomName(afterRoom.getRoomName());
		beforeRoom.setGameCategory(afterRoom.getGameCategory());
		beforeRoom.setMax(max);

		// 비밀번호 해싱
		if (roomPassword != null) {
			roomPassword = PasswordHashUtil.hashPassword(roomPassword);
		}
		beforeRoom.setRoomPassword(roomPassword);
		return "변경";
	}

	@Override
	public String exitRooms(RoomDto roomDto, RoomStatusDto roomStatus, String connectionId) {
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
					//방장이 될 사람이 준비 상태인 경우
					if (roomStatus.getPlayers().get(s).isReady()) {
						roomStatus.setReadyCount(roomStatus.getReadyCount() - 1);
						roomStatus.getPlayers().get(s).setReady(false);
					}
					roomStatus.setHostId(s);
					break;
				}
			}
		}

		roomStatus.getPlayers().remove(connectionId);
		return "나감";
	}

	@Override
	public RoomStatusDto addHostPlayer(AddPlayerDto addDto, UserDto user) {
		String connectionId = addDto.getConnectionId();
		int userSeq = user.getUserSeq();
		String userNickname = user.getUserNickname();

		//플레이어 설정
		PlayerDto newPlayer = new PlayerDto();
		newPlayer.setUserSeq(userSeq);
		newPlayer.setUserNickname(userNickname);
		newPlayer.setTeam("A");

		//방 상태 설정
		RoomStatusDto newRoomStatus = new RoomStatusDto();
		newRoomStatus.setHostId(connectionId);
		newRoomStatus.getPlayers().put(connectionId, newPlayer);
		return newRoomStatus;
	}

	@Override
	public String addPlayer(RoomStatusDto roomStatus, AddPlayerDto addDto, UserDto user) {
		String connectionId = addDto.getConnectionId();
		int userSeq = user.getUserSeq();
		String userNickname = user.getUserNickname();

		//플레이어 설정
		PlayerDto newPlayer = new PlayerDto();
		newPlayer.setUserSeq(userSeq);
		newPlayer.setUserNickname(userNickname);

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
		return "입장";
	}

	@Override
	public String moveTeam(RoomStatusDto roomStatus, PlayerDto player, String team) {
		//A팀으로 변경하는 경우
		if (team.equals("A")) {
			if (player.getTeam().equals("A"))
				return "변경불가";
			roomStatus.setCountA(roomStatus.getCountA() + 1);
			roomStatus.setCountB(roomStatus.getCountB() - 1);
			player.setTeam("A");
		}
		//B팀으로 변경하는 경우
		else {
			if (player.getTeam().equals("B"))
				return "변경불가";
			roomStatus.setCountB(roomStatus.getCountB() + 1);
			roomStatus.setCountA(roomStatus.getCountA() - 1);
			player.setTeam("B");
		}
		return "변경";
	}
}
