package org.project.uh.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.*;
import org.project.uh.user.dto.MypageDto;
import org.project.uh.user.dto.ResultDto;
import org.project.uh.user.dto.UserDto;

@Mapper
public interface UserDao {

	// 회원가입
	@Insert("insert into user(user_id, user_password) values(#{userId},#{userPassword})")
	public int insertUser(UserDto dto);

	// 회원 목록조회
	@Select("select * from user")
	public List<UserDto> listUser();


	// 회원가입 시 userId 중복 체크
	@Select("select count(*) from user where user_id = #{userId}")
	public int checkUserId(String userId);


	// 로그인 시 userId, userPassword 체크
	@Select("select * from user where user_id=#{userId} and user_password=#{userPassword}")
	public UserDto login(UserDto dto);

	public int getUserId(UserDto dto);

	// 닉네임 생성
	@Update("UPDATE user SET user_nickname = #{userNickname} WHERE user_id=#{userId}")
	public int nickname(UserDto dto);

	// 닉네임 생성 시 userNickname 중복 체크
	@Select("select count(*) from user where user_nickname = #{userNickname}")
	public int checkUserNickname(String userNickname);
	public int getUserNickname(UserDto dto);


	// 마이 페이지
	@Select("SELECT user_seq, user_id, user_nickname, rating FROM user WHERE user_seq = #{userSeq}")
	public MypageDto mypage(int userSeq);

	// 전적 조회
	@Select("SELECT * FROM game_result "
		+ "WHERE user1 = #{userSeq} OR user2 = #{userSeq} OR user3 = #{userSeq} OR user4 = #{userSeq} "
		+ "ORDER BY created DESC LIMIT 20")
	public List<ResultDto> userRecord(int userSeq);
}
