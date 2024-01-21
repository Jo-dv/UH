package org.project.uh.game.service;

import java.util.List;

import org.project.uh.game.dto.AnswerDto;
import org.project.uh.game.dto.ShoutDto;

public interface GameService {
	List<ShoutDto> shoutList();
	AnswerDto checkAnswer(AnswerDto userAnswer);
}
