package org.project.uh.ranking.controller;

import java.util.List;

import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserRankDto;
import org.project.uh.ranking.service.RankService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/rank", produces = "application/json; charset=UTF8")
@Tag(name = "랭크 api")
public class RankController {

	private final RankService service;

	// 개인 랭킹
	@Operation(
		summary = "개인 랭킹",
		description = "유저별 레이팅 상위 10명의 목록을 보내준다."
	)
	@GetMapping("/solo")
	public List<UserRankDto> userRank() {
		return service.userRank();
	}

	// 고요속의 외침 랭킹
	@Operation(
		summary = "고요 속의 침묵 랭킹",
		description = "고요 속의 침묵 상위 10팀의 목록을 보내준다."
	)
	@GetMapping("/shout")
	public List<RankDto> shoutRank() {
		return service.shoutRank();
	}

	// 인물 맞추기 랭킹
	@Operation(
		summary = "인물 맞추기 랭킹",
		description = "인물 맞추기 상위 10팀의 목록을 보내준다."
	)
	@GetMapping("/person")
	public List<RankDto> personRank() {
		return service.personRank();
	}

	// 단체 전체 랭킹
	@Operation(
		summary = "단체 랭킹",
		description = "고요속의 외침, 인물맞추기 상위 10팀의 목록을 보태준다."
	)
	@GetMapping("/rank")
	public List<RankDto> rank() {
		return service.rank();
	}
}