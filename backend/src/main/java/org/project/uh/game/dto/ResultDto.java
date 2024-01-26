package org.project.uh.game.dto;

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
public class ResultDto {
	private int resultId;
	private Integer user1;
	private Integer user2;
	private Integer user3;
	private Integer user4;
	private int gameCategory;
	private int score;
	private LocalDateTime created;
	private boolean win;
}
