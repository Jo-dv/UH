package org.project.uh.feedback.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.feedback.dto.FeedbackDto;

@Mapper
public interface FeedbackDao {

	// 피드백 보내기
	@Insert("INSERT INTO feedback(user_seq, feedback_content) VALUES(#{userSeq}, #{feedbackContent})")
	public int feedback(FeedbackDto dto);

	@Select("select * from feedback")
	public List<FeedbackDto> listFeedback();
}
