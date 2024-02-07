package org.project.uh.game.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.project.uh.game.dto.QuizDto;
import org.project.uh.game.dto.ResultDto;

@Mapper
public interface GameDao {
	@Select("select * "
		+ "from quiz_shout "
		+ "ORDER BY RAND() limit 150")
		// 무작위 문제 생성
	List<QuizDto> shoutList();

	@Select("select * "
		+ "from quiz_person "
		+ "ORDER BY RAND() limit 150")
		// 무작위 문제 생성
	List<QuizDto> personList();

	@Insert("insert into game_result(user1,user2,user3,user4,game_category,score,win) "
		+ "values(#{user1},#{user2},#{user3},#{user4},#{gameCategory},#{score},#{win});")
	int saveResult(ResultDto resultDto);

	@Update("UPDATE user SET rating = CASE "
		+ "WHEN rating + 10 >= 10000 "
		+ "THEN 10000 "
		+ "ELSE rating + 10 "
		+ "END "
		+ "WHERE user_seq = #{userSeq};")
	int upRating(int userSeq);

	@Update("UPDATE user SET rating = CASE "
		+ "WHEN rating -8 <= 0 "
		+ "THEN 0 "
		+ "ELSE rating - 8 "
		+ "END "
		+ "WHERE user_seq = #{userSeq};")
	int downRating(int userSeq);

}
