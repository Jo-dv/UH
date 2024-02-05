package org.project.uh.exception;

import org.project.uh.user.dto.UserDto;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class SessionInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		if (request.getMethod().equals("OPTIONS"))
			return true;

		HttpSession session = request.getSession();
		UserDto data = (UserDto)session.getAttribute("user");
		if (data == null) {
			throw new UnauthorizedException("로그인 정보가 없습니다.");
		} else if (data.getUserNickname() == null) {
			throw new NullNicknameException("닉네임 정보가 없습니다.");
		}
		return true;
	}
}
