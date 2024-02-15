package org.project.uh.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.project.uh.user.dto.MypageDto;
import org.project.uh.user.dto.RecordDto;
import org.project.uh.user.dto.UserDto;

@Mapper
public interface UserDao {

	// 회원가입
	@Insert("insert into user(user_id, user_password) values(#{userId},#{userPassword})")
	@Options(useGeneratedKeys = true, keyProperty = "userSeq")
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

	// 닉네임 생성
	@Update("UPDATE user SET user_nickname = #{userNickname} WHERE user_seq=#{userSeq}")
	public int nickname(int userSeq, String userNickname);

	// 닉네임 생성 시 userNickname 중복 체크
	@Select("select count(*) from user where user_nickname = #{userNickname}")
	public int checkUserNickname(String userNickname);

	// 마이 페이지
	@Select("SELECT user_seq, user_id, user_nickname, rating FROM user WHERE user_seq = #{userSeq}")
	public MypageDto mypage(int userSeq);

	// 전적 조회
	@Select("SELECT result_id,"
		+ "u1.user_nickname AS user1,"
		+ "u2.user_nickname AS user2,"
		+ "u3.user_nickname AS user3,"
		+ "u4.user_nickname AS user4,"
		+ "game_category,game_result.score,created,win "
		+ "FROM game_result  LEFT JOIN user u1 ON ((game_result.user1 = u1.user_seq)) "
		+ "LEFT JOIN user u2 ON ((game_result.user2 = u2.user_seq)) "
		+ "LEFT JOIN user u3 ON ((game_result.user3 = u3.user_seq)) "
		+ "LEFT JOIN user u4 ON ((game_result.user4 = u4.user_seq)) "
		+ "WHERE user1 = #{userSeq} OR user2 = #{userSeq} OR user3 = #{userSeq} OR user4 = #{userSeq} "
		+ "ORDER BY created DESC LIMIT 20")
	public List<RecordDto> userRecord(int userSeq);

	@Select("SELECT (SELECT COUNT(*) + 1 FROM rank_user AS v2 WHERE v2.rating > v1.rating) AS myRank "
		+ "FROM rank_user AS v1 WHERE user_seq = #{userSeq};")
	public int userRank(int userSeq);

	// 아이디 가지고 회원 정보 조회
	@Select("SELECT * from user WHERE user_id = #{userId}")
	public UserDto findById(String userId);

	// seq로 회원 정보 조회
	@Select("SELECT * FROM user WHERE user_seq = #{userSeq}")
	public UserDto findBySeq(int userSeq);

}
