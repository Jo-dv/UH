package org.project.uh.user.service;

import java.util.List;

import org.project.uh.user.dao.UserDao;
import org.project.uh.user.dto.MypageDto;
import org.project.uh.user.dto.UserDto;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserDao dao;

	// 회원 가입
	@Override
	public int insertUser(UserDto dto) {
		// 회원가입 시 userId 중복 체크
		if (dao.checkUserId(dto.getUserId()) > 0) {
			// 존재하는 userId, 회원가입 불가
			return 0;
		}
		// 중복 없으면 회원가입
		return dao.insertUser(dto);
	}

	// 닉네임 중복 체크
	@Override
	public int nicknameCheck(String userNickname) {
		if (dao.checkUserNickname(userNickname) > 0) {
			return 0;
		}
		return 1;
	}

	// 아이디 중복 체크
	@Override
	public int idCheck(String userId) {
		// 회원가입 시 userId 중복 체크
		if (dao.checkUserId(userId) > 0) {
			// 존재하는 userId, 회원가입 불가
			return 0;
		}
		// 중복 없으면 1
		return 1;
	}

	// 회원 목록 조회
	@Override
	public List<UserDto> listUser() {
		return dao.listUser();
	}

	// 로그인
	@Override
	public UserDto login(UserDto dto) {
		UserDto user = dao.login(dto);
		if (user == null) {
			return null;
		}
		return user;
	}

	// 닉네임 생성
	@Override
	public int nickname(int userSeq, String userNickname) {
		return dao.nickname(userSeq, userNickname);
	}

	// 마이페이지
	@Override
	public MypageDto mypage(int userSeq) {
		MypageDto mypage = dao.mypage(userSeq);
		mypage.setRecord(dao.userRecord(userSeq));
		mypage.setMyRank(dao.userRank(userSeq));
		return mypage;
	}

	// 아이디로 유저 정보 조회
	@Override
	public UserDto findById(String userId) {
		return dao.findById(userId);
	}

	// seq로 유저 정보 조회
	@Override
	public UserDto findBySeq(int userSeq) {
		return dao.findBySeq(userSeq);
	}

}
