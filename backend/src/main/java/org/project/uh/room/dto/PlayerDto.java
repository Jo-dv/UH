package org.project.uh.room.dto;

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
public class PlayerDto {
	private String team;
	private boolean isReady;
	private int userSeq;
	private String userNickname;

}
