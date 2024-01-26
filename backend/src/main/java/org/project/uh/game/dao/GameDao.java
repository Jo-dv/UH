package org.project.uh.game.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.game.dto.QuizDto;
import org.project.uh.game.dto.ResultDto;

@Mapper
public interface GameDao {
	@Select("select * "
		+ "from quiz_shout "
		+ "where quiz_category=#{quizCategory}"
		+ "ORDER BY RAND(123)")
		// 무작위 문제 생성
	List<QuizDto> shoutList(int quizCategory);

	@Select("select * "
		+ "from quiz_person "
		+ "ORDER BY RAND(123)")
		// 무작위 문제 생성
	List<QuizDto> personList();

	@Insert("insert into game_result(user1,user2,user3,user4,game_category,score,win) "
		+ "values(#{user1},#{user2},#{user3},#{user4},#{gameCategory},#{score},#{win});")
	int saveResult(ResultDto resultDto);

}
