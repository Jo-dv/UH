package org.project.uh.ranking.service;

import java.util.List;

import org.project.uh.ranking.dao.RankDao;
import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class RankServiceImpl implements RankService{


	public final RankDao dao;

	public RankServiceImpl(RankDao dao) {
		super();
		this.dao = dao;
	}

	@Override
	public List<UserDto> userRank() {
		return dao.userRank();
	}


	@Override
	public List<RankDto> shoutRank() {
		return dao.shoutRank();
	}

	@Override
	public List<RankDto> personRank() {
		return dao.personRank();
	}

}
