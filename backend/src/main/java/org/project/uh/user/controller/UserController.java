package org.project.uh.user.controller;

import java.util.List;

import org.project.uh.user.dto.UserDto;
import org.project.uh.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {
	private final UserService service;

	public UserController(UserService service) {
		super();
		this.service = service;
	}

	// 유저 목로
	@GetMapping("/user")
	public List<UserDto> listUser() {

		return service.listUser();
	}


	// 회원가입
	@PostMapping("/user/join")
	public int insertUser(@RequestBody UserDto dto) {
		System.out.println("dto = " + dto);
		return service.insertUser(dto);

	}

}
