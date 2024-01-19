package org.example.demo2.user.service;

import org.example.demo2.user.dto.UserDto;

import java.util.List;

public interface UserService {

    // 회원가입
    public int insertUser(UserDto dto);

    // 회원탈퇴
    public int deleteUser(int userId);

    // 회원 목록조회
    public List<UserDto> listUser();

    //회원 상세조회
    public UserDto detailUser(int userId);

    // 회원정보 수정
    public int updateUser(UserDto dto);

}
