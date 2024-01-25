package org.project.uh.user.controller;

import java.util.List;

import org.project.uh.user.dto.MypageDto;
import org.project.uh.user.dto.UserDto;
import org.project.uh.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(produces = "application/json; charset=UTF8")
@Tag(name = "유저 api")
public class UserController {
	private final UserService service;

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
		summary = "로그아웃"
	)
	@PostMapping("/user/logout")
	public ResponseEntity<Object> logout(HttpSession session) {
		session.invalidate();
		return new ResponseEntity<>("로그아웃", HttpStatus.OK);
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
		@ApiResponse(responseCode = "200", description = "닉네임 생성 성공"),
		@ApiResponse(responseCode = "400", description = "중복된 닉네임")
	})
	@PostMapping("/user/idcheck")
	public int idCheck(@RequestBody UserDto dto) {
		return service.idCheck(dto);
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
	// @GetMapping("/user/login/kakao")
	// public @ResponseBody String kakaoCallback(String code) { //데이터를 리턴해주는 컨트롤러 함수
	//
	// 	// POST방식으로 key=value 데이터를 요청 (카카오쪽으로)
	// 	RestTemplate rt = new RestTemplate();  // http요청을 쉽게 할 수 있는 라이브러리
	//
	// 	// HttpHeaders 오브젝트 생성
	// 	HttpHeaders headers = new HttpHeaders();
	// 	headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
	//
	// 	// HttpBody 오브젝트 생성
	// 	MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	// 	params.add("grant_type", "authorization_code"); // 값을 변수화하는게 낫다
	// 	params.add("client_id", "4fffa78521feee5e1eb947c704c08cf2");
	// 	params.add("redirect_uri", "http://localhost:5000/callback/kakao");
	// 	params.add("code", "KM6iCfuj4iXVerfO0XeiPpXFpUTuVwxSby0YdWDY2poYyvuUQr78ELVPAckKPXSYAAABjTSxbpPHP8VuE1ZNOQ");
	//
	// 	// HttpHeaders 와 HttpBody 를 하나의 오브젝트에 담기
	// 	HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest =
	// 		new HttpEntity<>(params, headers); //바디 데이터와 와 헤더값을 가지는 entity가 된다
	//
	// 	// Http 요청하기 - POST방식으로 그리고 response 변수의 응답 받음
	// 	ResponseEntity<String> response = rt.exchange(
	// 		"https://kauth.kakao.com/oauth/token", //토큰 발급 요청 주소
	// 		HttpMethod.POST, //요청 메서드 post
	// 		kakaoTokenRequest,
	// 		String.class // 응답받을 타입
	// 	);
	//
	// 	return "카카오 토큰 요청 완료 : 토큰요청에 대한 응답 : " + response;
	// }

}
