package org.project.uh.room.dto;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RoomStatusDto {
	private String hostId;
	private int readyCount = 0;
	private int countA = 1;
	private int countB = 0;
	private Map<String, PlayerDto> players = new ConcurrentHashMap<>();
}
