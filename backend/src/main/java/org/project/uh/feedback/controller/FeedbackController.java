package org.project.uh.feedback.controller;

import org.project.uh.feedback.dto.FeedbackDto;
import org.project.uh.feedback.service.FeedbackService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {

	private final FeedbackService service;

	public FeedbackController(FeedbackService service) {
		super();
		this.service = service;
	}

	// 피드백 보내기
	@PostMapping("/feedback")
	public int feedback(@RequestBody FeedbackDto dto) {
		return service.feedback(dto);
	}
}
