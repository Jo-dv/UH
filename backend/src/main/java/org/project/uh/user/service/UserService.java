package org.project.uh.user.service;

import java.util.List;

import org.project.uh.user.dto.UserDto;

public interface UserService {
	// 회원가입
	public int insertUser(UserDto dto);

	// 회원 목록조회
	public List<UserDto> listUser();

}
