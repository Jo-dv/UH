package org.project.uh.feedback.service;

import java.util.List;

import org.project.uh.feedback.dto.FeedbackDto;

public interface FeedbackService {
	public int feedback(FeedbackDto dto);

	public List<FeedbackDto> listFeedback();
}
