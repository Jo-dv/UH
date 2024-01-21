package org.project.uh.game.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.game.dto.AnswerDto;
import org.project.uh.game.dto.ShoutDto;

@Mapper
public interface GameDao {
	@Select("SELECT * "
		+ "FROM quiz_shout "
		+ "ORDER BY RAND()") // 무작위 문제 생성
	List<ShoutDto> shoutList();

	@Select("SELECT * "
		+ "FROM quiz_shout qs "
		+ "WHERE qs.quiz_id = #{quizId} AND qs.quiz_answer = #{quizAnswer}")
	AnswerDto checkAnswer(AnswerDto userAnswer);
}
