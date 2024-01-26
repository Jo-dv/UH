package org.project.uh.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AnswerDto {
	private int gameCategory;  // 실행하는 게임이 뭔지
	private int quizId;
	private String userAnswer;
}
