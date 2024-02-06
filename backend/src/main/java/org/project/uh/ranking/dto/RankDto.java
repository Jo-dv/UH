package org.project.uh.ranking.dto;

import java.time.LocalDateTime;

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
public class RankDto {
	private int resultId;
	private String user1;
	private String user2;
	private String user3;
	private String user4;
	private int score;
	private LocalDateTime created;
}