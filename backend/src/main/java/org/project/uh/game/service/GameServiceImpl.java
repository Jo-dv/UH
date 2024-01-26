package org.project.uh.game.service;

import java.util.List;

import org.project.uh.game.dao.GameDao;
import org.project.uh.game.dto.AnswerDto;
import org.project.uh.game.dto.ShoutDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor  // 생성자 주입
public class GameServiceImpl implements GameService {
	private final GameDao dao;

	@Override
	public List<ShoutDto> shoutList() {
		System.out.println("from serviceImpl");
		System.out.println(dao.shoutList());
		return dao.shoutList();
	}

	@Override
	public AnswerDto checkAnswer(AnswerDto userAnswer) {
		return dao.checkAnswer(userAnswer);
	}
}
