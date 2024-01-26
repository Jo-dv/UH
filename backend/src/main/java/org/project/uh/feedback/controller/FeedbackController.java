package org.project.uh.feedback.controller;

import org.project.uh.feedback.dto.FeedbackDto;
import org.project.uh.feedback.service.FeedbackService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(produces = "application/json; charset=UTF8")
@Tag(name = "피드백 api")
public class FeedbackController {

	private final FeedbackService service;

	// 피드백 보내기
	@Operation(
		summary = "피드백 보내기"
	)
	@PostMapping("/feedback")
	public int feedback(@RequestBody FeedbackDto dto) {
		return service.feedback(dto);
	}
}
