package org.project.uh.game.shout.service;

import java.util.List;

import org.project.uh.game.shout.dao.ShoutDao;
import org.project.uh.game.shout.dto.ShoutDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor  // 생성자 주입
public class ShoutServiceImpl implements ShoutService {
	private final ShoutDao dao;

	@Override
	public List<ShoutDto> shoutList() {
		System.out.println("from serviceImpl");
		System.out.println("dao");
		System.out.println(dao.shoutList());
		return dao.shoutList();
	}
}
