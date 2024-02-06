package org.project.uh.ranking.service;

import java.util.List;

import org.project.uh.ranking.dao.RankDao;
import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserRankDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService {

	public final RankDao dao;

	@Override
	public List<UserRankDto> userRank() {
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

	@Override
	public List<RankDto> rank() {
		return dao.rank();
	}

}
