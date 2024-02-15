package org.project.uh.config;

import org.project.uh.exception.GlobalExceptionHandler;
import org.project.uh.exception.SessionInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(sessionInterceptor())
			.excludePathPatterns("/api/user/**", "/error", "/api/swagger-ui/**",
				"swagger-resources/**", "/api/docs/**", "/api/api-docs/**");
	}

	@Bean
	public SessionInterceptor sessionInterceptor() {
		return new SessionInterceptor();
	}

	@Bean
	public GlobalExceptionHandler globalExceptionHandler() {
		return new GlobalExceptionHandler();
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("https://i10e201.p.ssafy.io/")
//			 		registry.addMapping("/**").allowedOrigins("http://localhost:3000/")
			.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
			.allowedHeaders("*")
			.allowCredentials(true).maxAge(3000);
	}
}
