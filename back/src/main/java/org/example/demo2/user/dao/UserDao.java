package org.example.demo2.user.dao;

import org.apache.ibatis.annotations.*;
import org.example.demo2.user.dto.UserDto;

import java.util.List;

@Mapper
public interface UserDao {

    // 회원가입
    @Insert("insert into users(ID,password) values(#{id},#{password})")
    public int insertUser(UserDto dto);

    // 회원탈퇴
    @Delete("delete from users where user_id=#{userId}")
    public int deleteUser(int userId);

    // 회원 목록조회
    @Select("select * from users")
    public List<UserDto> listUser();

    // 회원 상세조회
    @Select("select * from users where user_id=#{userId}")
    public UserDto detailUser(int userId);


    // 회원정보 수정
    @Update("update users set password=#{password},name=#{name} where user_id=#{userId}")
    public int updateUser(UserDto dto);
}
