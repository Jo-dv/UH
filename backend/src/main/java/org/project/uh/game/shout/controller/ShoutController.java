package org.project.uh.game.shout.controller;

import java.util.Collections;
import java.util.List;

import org.project.uh.game.shout.dto.ShoutDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.project.uh.game.shout.service.ShoutService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ShoutController {
	private final ShoutService service;

	@GetMapping("/game/{code}")
	public List<ShoutDto> shoutList(@PathVariable int code) {
		System.out.println(code);
		if(code == 200)
			return service.shoutList();
		return Collections.emptyList();
	}

}
