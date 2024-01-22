package org.project.uh.user.controller;

import java.util.List;

import org.project.uh.user.dto.UserDto;
import org.project.uh.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
	public int insertUser(@RequestBody UserDto dto) {
		return service.insertUser(dto);
	}


	// 로그인
	@PostMapping("/user/login")
	public Object login(@RequestBody UserDto dto) {
		return service.login(dto);
	}

	// 닉네임 생성
	@PostMapping("/user/nickname")
	public int nickname(@RequestBody UserDto dto) {
		return service.nickname(dto);
	}
}
