package org.project.uh.user.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.project.uh.user.dto.MypageDto;
import org.project.uh.user.dto.SocialUserDto;
import org.project.uh.user.dto.UserDto;
import org.project.uh.user.service.UserService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api", produces = "application/json; charset=UTF8")
@Tag(name = "유저 api")
public class UserController {
	private final UserService service;

	private final String clientId = "4fffa78521feee5e1eb947c704c08cf2"; // 카카오 앱의 Client ID
	private final String redirectUri = "http://localhost:3000/callback/kakao"; // Redirect URI
	private final String tokenRequestUri = "https://kauth.kakao.com/oauth/token"; // 카카오 토큰 요청 URI
	private final String requestUri = "https://kapi.kakao.com/v2/user/me"; // 카카오 사용자 정보 요청 URI
	private final String kakaoLogoutUri = "https://kauth.kakao.com/oauth/logout"; // 카카오 로그아웃 URI

	// 유저 목록
	@Operation(
		summary = "유저 목록"
	)
	@GetMapping("/user")
	public List<UserDto> listUser() {
		return service.listUser();
	}

	@Operation(
		summary = "유저 가입"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "가입 성공"),
		@ApiResponse(responseCode = "400", description = "중복된 아이디")
	})
	// 회원가입
	@PostMapping("/user/join")
	public ResponseEntity<String> insertUser(@RequestBody UserDto dto) {
		int result = service.insertUser(dto);
		if (result == 0) {
			return new ResponseEntity<>("중복된 아이디", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("가입 성공", HttpStatus.OK);
	}

	// 유저 정보 확인
	@Operation(
		summary = "로그인 상태 확인",
		description = "로그인 상태라면 user정보를 아니라면 null을 반환"
	)
	@GetMapping("/user/check")
	public ResponseEntity<Object> userCheck(HttpSession session) {
		System.out.println("요청 들어옴");
		// 세션에서 'user' 속성 가져오기
		UserDto user = (UserDto)session.getAttribute("user");
		if (user != null) {
			// 사용자 정보가 세션에 있으면, 해당 정보 반환
			System.out.println(user);
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			// 사용자 정보가 세션에 없으면, null 또는 적절한 응답 반환
			System.out.println("null입니다");
			return new ResponseEntity<>(null, HttpStatus.OK);
		}
	}

	// 로그인
	@Operation(
		summary = "로그인"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그인 성공"),
		@ApiResponse(responseCode = "400", description = "로그인 오류")
	})
	@PostMapping("/user/login")
	public ResponseEntity<Object> login(@RequestBody UserDto dto, HttpSession session) {
		UserDto result = service.login(dto);
		if (result == null) {
			return new ResponseEntity<>("로그인 오류", HttpStatus.BAD_REQUEST);
		}
		// 로그인 성공
		result.setUserPassword(null);
		session.setAttribute("user", result);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	// 로그아웃
	@Operation(
		summary = "로그아웃",
		description = "카카오 로그아웃이면 2 반환, 일반 로그아웃이면 1 반환"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "로그아웃 성공")
	})
	// @PostMapping("/user/logout")
	// public ResponseEntity<Object> logout(@RequestBody UserDto dto, HttpSession session) {
	// 	UserDto user = (UserDto)session.getAttribute("user");
	// 	UserDto loginUser = service.findBySeq(user.getUserSeq());
	// 	System.out.println("UserController.logout user 확인 = " + user);
	// 	System.out.println("UserController.logout loginuser 확인 = " + loginUser);
	// 	if (loginUser.getUserPassword() == null) {
	// 		// 비밀번호가 없으면 카카오 계정과 함께 로그아웃
	// 		RestTemplate template = new RestTemplate();
	// 		String uri = UriComponentsBuilder.fromHttpUrl(kakaoLogoutUri)
	// 			.queryParam("client_id", clientId)
	// 			.queryParam("logout_redirect_uri", "http://localhost:3000/auth/login")
	// 			.toUriString();
	// 		ResponseEntity<String> response = template.getForEntity(uri, String.class);
	// 		System.out.println("카카오 로그아웃 response = " + response);
	// 		session.invalidate();
	// 		System.out.println("카카오 로그아웃 세션 = " + session);
	// 		return new ResponseEntity<>("카카오톡 로그아웃", HttpStatus.OK);
	// 	}
	// 	// 비밀번호가 있으면 일반 로그아웃
	// 	session.invalidate();
	// 	System.out.println("일반 로그아웃 세션 = " + session);
	// 	return new ResponseEntity<>("로그아웃", HttpStatus.OK);
	// }
	@PostMapping("/user/logout")
	public ResponseEntity<Object> logout(@RequestBody UserDto dto, HttpSession session) {
		UserDto user = (UserDto)session.getAttribute("user");
		UserDto loginUser = service.findBySeq(user.getUserSeq());
		if (loginUser.getUserPassword() == null) {
			// 비밀번호가 없으면 카카오 계정으로 반환
			session.invalidate();
			return new ResponseEntity<>(2, HttpStatus.OK);
		}
		// 비밀번호가 있으면 일반 로그아웃으로 판단
		session.invalidate();
		return new ResponseEntity<>(1, HttpStatus.OK);
	}

	// 닉네임 생성
	@Operation(
		summary = "닉네임 생성",
		description = "처음 로그인한 유저의 닉네임 생성"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "닉네임 생성 성공"),
		@ApiResponse(responseCode = "400", description = "중복된 닉네임")
	})
	@PostMapping("/user/nickname")
	public ResponseEntity<String> nickname(@RequestBody UserDto dto) {
		int result = service.nickname(dto);
		if (result == 0) {
			return new ResponseEntity<>("중복된 닉네임", HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>("닉네임 생성 성공", HttpStatus.OK);
	}

	// 회원가입 시 아이디 중복 체크
	@Operation(
		summary = "아이디 중복 체크",
		description = "중복된 아이디가 있으면 0, 없으면 1 반환"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "아이디 생성 성공"),
		@ApiResponse(responseCode = "400", description = "중복된 닉네임")
	})
	@PostMapping("/user/idcheck")
	public int idCheck(@RequestBody UserDto dto) {
		return service.idCheck(dto);
	}


	// 회원가입 시 닉네임 중복 체크
	@Operation(
		summary = "닉네임 중복 체크",
		description = "중복된 닉네임이 있으면 0, 없으면 1 반환"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "닉네임 생성 성공"),
		@ApiResponse(responseCode = "400", description = "중복된 닉네임")
	})
	@PostMapping("/user/nicknamecheck")
	public int nicknameCheck(@RequestBody UserDto dto) {
		return service.nicknameCheck(dto);
	}

	// 마이페이지
	@Operation(
		summary = "회원 정보 조회",
		description = "회원 정보와 전적 제공"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "회원 정보 조회 성공"),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping("/mypage/{userSeq}")
	public ResponseEntity<MypageDto> mypage(@PathVariable(value = "userSeq") int userSeq) {
		try {
			return new ResponseEntity<>(service.mypage(userSeq), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	// 카카오 로그인
	@Operation(
		summary = "카카오 로그인"
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "카카오 로그인 또는 회원가입 성공"),
		@ApiResponse(responseCode = "500", description = "카카오 로그인 에러")
	})
	@PostMapping("/user/login/kakao")
	// 인가 코드로 Access 토큰 발급 받기
	public ResponseEntity<Object> kakaoLogin(@RequestBody String code, HttpSession session) {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.add("grant_type", "authorization_code");
		params.add("client_id", clientId);
		params.add("redirect_uri", redirectUri);
		params.add("code", code);

		HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

		try {
			ResponseEntity<String> response = restTemplate.postForEntity(tokenRequestUri, request, String.class);
			// System.out.println("response = " + response);
			ObjectMapper objectMapper = new ObjectMapper();
			String responseBody = response.getBody();
			JsonNode rootNode = objectMapper.readTree(responseBody);
			// System.out.println("rootNode = " + rootNode);
			JsonNode accessTokenNode = rootNode.path("access_token");
			JsonNode expiresInNode = rootNode.path("expires_in");
			int expiresIn = expiresInNode.asInt();
			String accessToken = accessTokenNode.asText();

			// 카카오에 사용자 정보 요청
			RestTemplate template = new RestTemplate();
			HttpHeaders header = new HttpHeaders();
			header.add("Authorization", "Bearer " + accessToken);
			header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

			HttpEntity<String> rq = new HttpEntity<>(header);

			ResponseEntity<Map> rr = template.exchange(requestUri, HttpMethod.GET, rq, Map.class);
			Map<String, Object> rpbody = rr.getBody();

			Long kakaoId = (Long)rpbody.get("id");

			UserDto kakaoDto = new UserDto();
			kakaoDto.setUserId("K" + kakaoId);
			int result = service.insertUser(kakaoDto);
			if (result == 0) {
				// 이미 회원가입 된 회원, 카카오 로그인 진행
				// userId 가지고 DB 조회해서 정보값 가져오기
				Object kakaoUserInfo = service.findById("K" + kakaoId);

				// 소셜 토큰 테이블에 토큰 삽입
				SocialUserDto socialDto = new SocialUserDto();
				socialDto.setAccessToken(accessToken);
				socialDto.setSocialProvider(1);
				socialDto.setSocialUserId(kakaoDto.getUserId());
				// 만료 시간 삽입
				LocalDateTime now = LocalDateTime.now();
				LocalDateTime expireTime = now.plusSeconds(expiresIn);
				socialDto.setExpiresIn(expireTime);

				UserDto socialUserInfo = service.findById(kakaoDto.getUserId());
				socialDto.setUserSeq(socialUserInfo.getUserSeq());

				int kakaoResult = service.insertSocialUser(socialDto);
				session.setAttribute("user", kakaoUserInfo);
				return new ResponseEntity<>(kakaoUserInfo, HttpStatus.OK);
			}
			// 처음 접속한 회원이라면 회원가입
			Object kUserInfo = service.findById("K" + kakaoId);
			session.setAttribute("user", kUserInfo);
			return new ResponseEntity<>(kUserInfo, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("카카오 로그인 실패", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}