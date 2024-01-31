package org.project.uh.code.controller;

import java.util.List;

import org.project.uh.code.dto.CodeDto;
import org.project.uh.code.service.CodeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping(value = "/code", produces = "application/json; charset=UTF8")
@Tag(name = "공통 코드 api")
public class CodeController {

	private final CodeService codeService;

	@Operation(
		summary = "공통 코드 불러오기",
		description = "그룹 코드에 맞는 공통 코드 리스트를 보낸다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 로드되었습니다.")
	})
	@GetMapping("/{groupCode}")
	public ResponseEntity<List<CodeDto>> listCode(@PathVariable int groupCode) {

		return new ResponseEntity<>(codeService.listCode(groupCode), HttpStatus.OK);
	}
}
