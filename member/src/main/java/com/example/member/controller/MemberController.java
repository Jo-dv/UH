package com.example.member.controller;

import com.example.member.dto.MemberDTO;
//import com.example.member.service.MemberService;
import com.example.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;

    @GetMapping("/member/join")
    public String joinForm() {
        return "join";
    }

    @GetMapping("/member/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/member/join")
    public String join(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.join");
        System.out.println("memberDTO = " + memberDTO);
        memberService.join(memberDTO);
        return "login";
    }

    @PostMapping("/member/login")
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            // login 성공
            session.setAttribute("loginNickname", loginResult.getMemberNickname());
            return "lobby";
        } else {
            // login 실패
            return "login";
        }
    }

    @GetMapping("/member/list")
    public String findAll(Model model) {
        List<MemberDTO> memberDTOList = memberService.findAll();
        model.addAttribute("memberList", memberDTOList);
        return "list";
    }

// 위에 멤버리스트 조회는 여러개라서 list, 밑에 상세조회는 한사람이라 하나만 반환
    @GetMapping("/member/{id}")
    public String findById(@PathVariable Long id, Model model) {
        MemberDTO memberDTO = memberService.findById(id);
        model.addAttribute("member", memberDTO);
        return "detail";
    }

    @GetMapping("/member/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }

    @PostMapping("/member/nickname-check")
    public @ResponseBody String nicknameCheck(@RequestParam("memberNickname") String memberNickname) {
        System.out.println(memberNickname);
        String checkResult = memberService.nicknameCheck(memberNickname);
        if (checkResult != null) {
            return "가능";
        } else {
            return "no";
        }
    }


    @GetMapping("/member/login/kakao")
    public String loginKakao() {
        return "loginKakao";
    }

    @RequestMapping("/member/login/naver")
    public String naver_login(HttpServletRequest request) {
        String client_id = "ijkv4FXrCAhLJ9j9Y1FL";
        String redirect_uri = "http://localhost:8081/lobby";
        String state = RandomStringUtils.randomAlphanumeric(10); // 알파벳 대소문자+숫자 랜덤 문자열 생성
        String login_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code"
                + "&client_id=" + client_id
                + "&redirect_uri=" + redirect_uri
                + "&state=" + state
                + "&auth_type=reauthenticate";

        request.getSession().setAttribute("state", state);

        return "redirect:" + login_url;
    }

    @RequestMapping("/naver_redirect")
    public String naver_redirect(HttpServletRequest request) {
        // 네이버에서 전달해준 code, state 값 가져오기
        String code = request.getParameter("code");
        String state = request.getParameter("state");

        // 세션에 저장해둔 state값 가져오기
        String session_state = String.valueOf(request.getSession().getAttribute("state"));

        // CSRF 공격 방지를 위해 state 값 비교
        if (!state.equals(session_state)) {
            System.out.println("세션 불일치");
            request.getSession().removeAttribute("state");
            return "/error";
        }

        String tokenURL = "https://nid.naver.com/oauth2.0/token";
        String client_id = "ijkv4FXrCAhLJ9j9Y1FL";
        String client_secret = "b1Mc5Is9Vj";

        // body data 생성
        MultiValueMap<String, String> parameter = new LinkedMultiValueMap<>();
        parameter.add("grant_type", "authorization_code");
        parameter.add("client_id", "ijkv4FXrCAhLJ9j9Y1FL");
        parameter.add("client_secret", "b1Mc5Is9Vj");
        parameter.add("code", code);
        parameter.add("state", state);

        // request header 설정
        HttpHeaders headers = new HttpHeaders();
        // Content-type을 application/x-www-form-urlencoded 로 설정
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // header 와 body로 Request 생성
        HttpEntity<?> entity = new HttpEntity<>(parameter, headers);

        Map<String, String> resMap = null;
        RestTemplate restTemplate = null;
        try {
            restTemplate = new RestTemplate();
            // 응답 데이터(json)를 Map 으로 받을 수 있도록 관련 메시지 컨버터 추가
            restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

            // Post 방식으로 Http 요청
            // 응답 데이터 형식은 Hashmap 으로 지정
            ResponseEntity<HashMap> result = restTemplate.postForEntity(tokenURL, entity, HashMap.class);
            resMap = result.getBody();

            // 응답 데이터 확인
            System.out.println(resMap);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 리턴받은 access_token 가져오기
        String access_token = resMap.get("access_token");

        String userInfoURL = "https://openapi.naver.com/v1/nid/me";
        // Header에 access_token 삽입
        headers.set("Authorization", "Bearer " + access_token);

        // Request entity 생성
        HttpEntity<?> userInfoEntity = new HttpEntity<>(headers);

        // Post 방식으로 Http 요청
        // 응답 데이터 형식은 Hashmap 으로 지정
        ResponseEntity<HashMap> userResult = restTemplate.postForEntity(userInfoURL, userInfoEntity, HashMap.class);
        Map<String, String> userResultMap = userResult.getBody();

        //응답 데이터 확인
        System.out.println(userResultMap);


        // 세션에 저장된 state 값 삭제
        request.getSession().removeAttribute("state");

        return "/sns/sns_result";
    }

}
