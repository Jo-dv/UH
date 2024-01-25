package org.project.uh.ranking.controller;

import java.util.List;

import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.service.RankService;
import org.project.uh.ranking.dto.UserDto;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RankController {

	private final RankService service;

	public RankController(RankService service) {
		super();
		this.service = service;
	}

	// 개인 랭킹
	@GetMapping("/rank/solo")
	public List<UserDto> userRank() {
		return service.userRank();
	}


	// 고요속의 외침 랭킹
	@GetMapping("/rank/shout")
	public List<RankDto> shoutRank() {
		return service.shoutRank();
	}

	// 인물 맞추기 랭킹
	@GetMapping("/rank/person")
	public List<RankDto> personRank() {
		return service.personRank();
	}
}