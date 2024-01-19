package org.project.uh.game.shout.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.game.shout.dto.ShoutDto;

@Mapper
public interface ShoutDao {
	@Select("SELECT * FROM quiz_shout")
	List<ShoutDto> shoutList();
}
