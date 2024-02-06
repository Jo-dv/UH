package org.project.uh.room;

import java.util.Map;

import org.project.uh.room.dto.AddPlayerDto;
import org.project.uh.room.dto.PlayerDto;
import org.project.uh.room.dto.RoomDto;
import org.project.uh.room.dto.RoomStatusDto;
import org.project.uh.user.dto.UserDto;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

public interface RoomService {
	public String createRoom(OpenVidu openvidu, RoomDto roomDto, Map<String, RoomDto> roomList) throws
		OpenViduJavaClientException,
		OpenViduHttpException;

	public String enterRoom(RoomDto room);

	public String updateRoomSettings(RoomDto beforeRoom, RoomDto afterRoom);

	public String exitRooms(RoomDto roomDto, RoomStatusDto roomStatus, String connectionId);

	public RoomStatusDto addHostPlayer(AddPlayerDto addDto, UserDto user);

	public String addPlayer(RoomStatusDto roomStatus, AddPlayerDto addDto, UserDto user);

	public String moveTeam(RoomStatusDto roomStatus, PlayerDto player, String team);

}
