package org.project.uh.ranking.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.ranking.dto.RankDto;
import org.project.uh.ranking.dto.UserDto;

@Mapper
public interface RankDao {


	// 개인 랭킹 조회
	@Select("SELECT * FROM user ORDER BY rating DESC LIMIT 10")
	public List<UserDto> userRank();


	// 고요속의 외침 랭킹
	// 사람 수랑 게임 코드
	@Select("SELECT * FROM game_result "
		+ "WHERE game_category = 101 "
		+ "ORDER BY score DESC LIMIT 10")
	public List<RankDto> shoutRank();

	// 인물 맞추기 랭킹
	@Select("SELECT * FROM game_result "
		+ "WHERE game_category = 201"
		+ "ORDER BY score DESC LIMIT 10")
	public List<RankDto> personRank();
}
