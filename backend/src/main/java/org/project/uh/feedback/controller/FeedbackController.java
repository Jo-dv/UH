package org.project.uh.feedback.controller;

import java.util.List;

import org.project.uh.feedback.dto.FeedbackDto;
import org.project.uh.feedback.service.FeedbackService;
import org.project.uh.user.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api", produces = "application/json; charset=UTF8")
@Tag(name = "피드백 api")
public class FeedbackController {

	private final FeedbackService service;

	// 피드백 보내기
	@Operation(
		summary = "피드백 보내기"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "401", description = "로그인 정보가 없습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@PostMapping("/feedback")
	public ResponseEntity<String> feedback(@RequestBody FeedbackDto dto,
		@SessionAttribute(name = "user") UserDto user) {
		try {
			dto.setUserSeq(user.getUserSeq());
			if (service.feedback(dto) == 1)
				return new ResponseEntity<>("정상적으로 처리되었습니다.", HttpStatus.OK);
			else
				return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			return new ResponseEntity<>("비정상적인 접근", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// 피드백 조회
	@Operation(
		summary = "피드백 조회"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근"),
	})
	@GetMapping("/feedback")
	public ResponseEntity<List<FeedbackDto>> feedback() {
		try {
			return new ResponseEntity<>(service.listFeedback(), HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
