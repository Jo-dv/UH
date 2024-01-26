package org.project.uh.game.controller;

import java.util.Collections;
import java.util.List;

import org.project.uh.game.dto.AnswerDto;
import org.project.uh.game.dto.ShoutDto;
import org.project.uh.game.service.GameService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/game", produces = "application/json; charset=UTF8")
@Tag(name = "게임 api")
public class GameController {

	private final GameService service;

<<<<<<< HEAD
	@GetMapping("/game/{game_request}")
	public List<ShoutDto> shoutList(@PathVariable int game_request) {
		if (game_request == 200) {
=======
	@GetMapping("/{code}")
	public List<ShoutDto> shoutList(@PathVariable int code) {
		if (code == 201) {
>>>>>>> d46fdcd3241b9365de9b40dcaf7812f96b4c74bf
			return service.shoutList();
		}
		return Collections.emptyList();
	}

	@GetMapping("/answer")  // client에서 현재 문제의 문제 id와 사용자의 답을 받아 검색
	public boolean checkAnswer(AnswerDto userAnswer) {
		AnswerDto result = service.checkAnswer(userAnswer);
		System.out.println("from GameController: " + result != null);
		return result != null;
	}
}
