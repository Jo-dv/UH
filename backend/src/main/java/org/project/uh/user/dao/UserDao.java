package org.project.uh.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.*;
import org.project.uh.user.dto.UserDto;

@Mapper
public interface UserDao {

	// 회원가입
	@Insert("insert into user(userId, userPassword) values(#{userId},#{userPassWord})")
	public int insertUser(UserDto dto);

	// 회원 목록조회
	@Select("select * from user")
	public List<UserDto> listUser();
}
