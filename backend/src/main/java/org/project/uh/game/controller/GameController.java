package org.project.uh.game.controller;

import java.util.List;
import java.util.Map;

import org.project.uh.game.dto.QuizDto;
import org.project.uh.game.service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/game", produces = "application/json; charset=UTF8")
@Tag(name = "게임 api")
public class GameController {

	private final GameService service;

<<<<<<< HEAD
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
=======
	@Operation(
		summary = "문제 로드",
		description = "각 방에 맞는 문제를 방의 참여자들에게 보낸다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 로드되었습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping("/{sessionId}")
	public ResponseEntity<List<QuizDto>> listQuiz(@PathVariable String sessionId, Model model) {
>>>>>>> 93c18c2debab931d50da18e06823b0026278b11c

		Map<String, List<QuizDto>> quizList = (Map<String, List<QuizDto>>)model.getAttribute("quizList");
		if (quizList == null) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		//예외처리
		if (quizList.get(sessionId) == null) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(quizList.get(sessionId), HttpStatus.OK);
	}
}
