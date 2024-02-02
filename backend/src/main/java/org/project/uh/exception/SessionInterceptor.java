package org.project.uh.exception;

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
		if (session.getAttribute("user") == null) {
			throw new UnauthorizedException("로그인 정보가 없습니다.");
		}
		return true;
	}
}
