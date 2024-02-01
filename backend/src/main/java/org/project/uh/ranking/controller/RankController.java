package org.project.uh.ranking.controller;

import java.util.List;

import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserRankDto;
import org.project.uh.ranking.service.RankService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/rank", produces = "application/json; charset=UTF8")
@Tag(name = "랭크 api")
public class RankController {

	private final RankService service;

	// 개인 랭킹
	@Operation(
		summary = "개인 랭킹",
		description = "유저별 레이팅 상위 10명의 목록을 보내준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping("/solo")
	public ResponseEntity<List<UserRankDto>> userRank() {
		try {
			return new ResponseEntity<>(service.userRank(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 고요속의 외침 랭킹
	@Operation(
		summary = "고요 속의 외침 랭킹",
		description = "고요 속의 외침 상위 10팀의 목록을 보내준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping("/shout")
	public ResponseEntity<List<RankDto>> shoutRank() {
		try {
			return new ResponseEntity<>(service.shoutRank(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 인물 맞추기 랭킹
	@Operation(
		summary = "인물 맞추기 랭킹",
		description = "인물 맞추기 상위 10팀의 목록을 보내준다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping("/person")
	public ResponseEntity<List<RankDto>> personRank() {
		try {
			return new ResponseEntity<>(service.personRank(), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}