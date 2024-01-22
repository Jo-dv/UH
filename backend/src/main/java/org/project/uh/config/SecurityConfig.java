package org.project.uh.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

		http
			.authorizeHttpRequests((auth) -> auth
					.requestMatchers("/", "/user","/user/join", "/user/login").permitAll()
				// .requestMatchers("/user").hasRole("ADMIN")
				// .requestMatchers("/mypage/**").hasAnyRole("ADMIN", "USER")
				// .anyRequest().authenticated()
			);

		// http
		// 	.formLogin((auth) -> auth.loginPage("/user/login")
		// 		.loginProcessingUrl("/user/login")
		// 		.permitAll()
		// 	);

		http
			.csrf((auth) -> auth.disable());

		return http.build();
	}


	// 다중 로그인 설정
	// maximumSession(정수) : 하나의 아이디에 대한 다중 로그인 허용 개수
	// maxSessionPreventsLogin(불린) : 다중 로그인 개수를 초과하였을 경우 처리 방법
	// true : 초과시 새로운 로그인 차단
	// false : 초과시 기존 세션 하나 삭제
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

		http
			.sessionManagement((auth) -> auth
				.maximumSessions(1)
				.maxSessionsPreventsLogin(true));

		return http.build();
	}
}
