package org.project.uh.game.shout.dto;

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
public class ShoutDto {
	private int quizId;
	private int quizCategory;
	private String quizAnswer;
}
