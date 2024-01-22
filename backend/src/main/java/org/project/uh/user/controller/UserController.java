package org.project.uh.user.controller;

import java.util.List;

import org.project.uh.user.dto.UserDto;
import org.project.uh.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {
	private final UserService service;

	public UserController(UserService service) {
		super();
		this.service = service;
	}

	// 유저 목록
	@GetMapping("/user")
	public List<UserDto> listUser() {
		return service.listUser();
	}

	// 회원가입
	@PostMapping("/user/join")
	public ResponseEntity<String> insertUser(@RequestBody UserDto dto) {
		int result = service.insertUser(dto);
		if (result == 0) {
			return new ResponseEntity<>("중복된 아이디", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("가입 성공", HttpStatus.OK);
	}


	// 로그인
	@PostMapping("/user/login")
	public ResponseEntity<Object> login(@RequestBody UserDto dto) {
		Object result = service.login(dto);
		if (result == null) {
			return new ResponseEntity<>("로그인 오류", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// 닉네임 생성
	@PostMapping("/user/nickname")
	public ResponseEntity<String> nickname(@RequestBody UserDto dto) {
		int result = service.nickname(dto);
		if (result == 0) {
			return new ResponseEntity<>("중복된 닉네임", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("닉네임 생성 성공", HttpStatus.OK);
	}

	// 회원가입 시 아이디 중복 체크
	@PostMapping("/user/idcheck")
	public int idCheck(@RequestBody UserDto dto) {
		return service.idCheck(dto);
	}
}
