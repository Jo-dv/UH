package org.project.uh.code.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.project.uh.code.dto.CodeDto;

@Mapper
public interface CodeDao {
	@Select("select common_code,code_name from common_code where group_code=#{groupCode}")
	List<CodeDto> listCode(int groupCode);
}
