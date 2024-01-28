package org.project.uh.feedback.service;

import org.project.uh.feedback.dao.FeedbackDao;
import org.project.uh.feedback.dto.FeedbackDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

	private final FeedbackDao dao;

	@Override
	public int feedback(FeedbackDto dto) {
		return dao.feedback(dto);
	}
}
