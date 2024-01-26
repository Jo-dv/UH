package org.project.uh.ranking.service;

import java.util.List;

import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserRankDto;

public interface RankService {

	// 개인 랭킹
	public List<UserRankDto> userRank();

	// 고요속의 외침 랭킹
	public List<RankDto> shoutRank();

	// 인물 맞추기 랭킹
	public List<RankDto> personRank();
}
