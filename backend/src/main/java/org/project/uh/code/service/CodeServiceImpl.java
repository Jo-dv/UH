package org.project.uh.code.service;

import java.util.List;

import org.project.uh.code.dao.CodeDao;
import org.project.uh.code.dto.CodeDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor  // 생성자 주입
public class CodeServiceImpl implements CodeService {
	private final CodeDao codeDao;

	@Override
	public List<CodeDto> listCode(int groupCode) {
		return codeDao.listCode(groupCode);
	}
}
