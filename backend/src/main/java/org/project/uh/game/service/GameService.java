package org.project.uh.game.service;

import java.util.List;

import org.project.uh.game.dto.QuizDto;
import org.project.uh.room.dto.RoomStatusDto;

public interface GameService {
	List<QuizDto> listQuiz(int gameCategory, int quizCategory);

	int saveResult(int gameCategory, RoomStatusDto roomStatus, String winTeam, int winScore, int loseScore);
}
