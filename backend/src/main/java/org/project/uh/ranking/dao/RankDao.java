package org.project.uh.ranking.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserRankDto;

@Mapper
public interface RankDao {

	// 개인 랭킹 조회
	@Select("select * from rank_user limit 10")
	public List<UserRankDto> userRank();

	// 고요속의 외침 랭킹
	// 사람 수랑 게임 코드
	@Select("select * from rank_shout")
	public List<RankDto> shoutRank();

	// 인물 맞추기 랭킹
	@Select("select * from rank_person")
	public List<RankDto> personRank();

	// 전체 랭킹
	@Select("SELECT * FROM game_result"
		+ "ORDER BY score DESC LIMIT 10")
	public List<RankDto> rank();
}
