package org.project.uh.game.controller;

import java.util.Collections;
import java.util.List;

import org.project.uh.game.dto.AnswerDto;
import org.project.uh.game.dto.ShoutDto;
import org.project.uh.game.service.GameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class GameController {
	private final GameService service;

	@GetMapping("/game/{code}")
	public List<ShoutDto> shoutList(@PathVariable int code) {
		if(code == 200) {
			return service.shoutList();
		}
		return Collections.emptyList();
	}

	@GetMapping("/game/answer")  // client에서 현재 문제의 문제 id와 사용자의 답을 받아 검색
	public boolean checkAnswer(AnswerDto userAnswer) {
		AnswerDto result = service.checkAnswer(userAnswer);
		System.out.println("from GameController: " + result != null);
		return result != null;
	}
}
