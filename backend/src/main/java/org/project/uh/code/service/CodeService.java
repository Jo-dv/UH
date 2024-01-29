package org.project.uh.code.service;

import java.util.List;

import org.project.uh.code.dto.CodeDto;

public interface CodeService {
	List<CodeDto> listCode(int groupCode);
}
