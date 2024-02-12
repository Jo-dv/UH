package org.project.uh.game.service;

import java.util.List;
import java.util.Set;

import org.project.uh.game.dao.GameDao;
import org.project.uh.game.dto.QuizDto;
import org.project.uh.game.dto.ResultDto;
import org.project.uh.room.dto.RoomStatusDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor  // 생성자 주입
public class GameServiceImpl implements GameService {
	private final GameDao dao;

	@Override
	public List<QuizDto> listQuiz(int gameCategory) {
		//고요 속의 외침
		if (gameCategory == 101) {
			return dao.shoutList();
		}
		//인물 맞추기
		else if (gameCategory == 102) {
			return dao.personList();
		}
		return null;
	}

	@Transactional
	@Override
	public int saveResult(int gameCategory, RoomStatusDto roomStatus, String winTeam, int winScore, int loseScore) {
		Set<String> players = roomStatus.getPlayers().keySet();
		ResultDto winResult = new ResultDto();
		ResultDto loseResult = new ResultDto();

		//승리팀 설정
		winResult.setGameCategory(gameCategory);
		winResult.setWin(true);
		winResult.setScore(winScore);
		for (String player : players) {
			if (roomStatus.getPlayers().get(player).getTeam().equals(winTeam)) {
				if (winResult.getUser1() == null) {
					winResult.setUser1(roomStatus.getPlayers().get(player).getUserSeq());
					dao.upRating(winResult.getUser1());
					continue;
				}
				if (winResult.getUser2() == null) {
					winResult.setUser2(roomStatus.getPlayers().get(player).getUserSeq());
					dao.upRating(winResult.getUser2());
					continue;
				}
				if (winResult.getUser3() == null) {
					winResult.setUser3(roomStatus.getPlayers().get(player).getUserSeq());
					dao.upRating(winResult.getUser3());
					continue;
				}
				if (winResult.getUser4() == null) {
					winResult.setUser4(roomStatus.getPlayers().get(player).getUserSeq());
					dao.upRating(winResult.getUser4());
				}
			}
		}

		//패배팀 설정
		loseResult.setGameCategory(gameCategory);
		loseResult.setScore(loseScore);
		for (String player : players) {
			if (!roomStatus.getPlayers().get(player).getTeam().equals(winTeam)) {
				if (loseResult.getUser1() == null) {
					loseResult.setUser1(roomStatus.getPlayers().get(player).getUserSeq());
					dao.downRating(loseResult.getUser1());
					continue;
				}
				if (loseResult.getUser2() == null) {
					loseResult.setUser2(roomStatus.getPlayers().get(player).getUserSeq());
					dao.downRating(loseResult.getUser2());
					continue;
				}
				if (loseResult.getUser3() == null) {
					loseResult.setUser3(roomStatus.getPlayers().get(player).getUserSeq());
					dao.downRating(loseResult.getUser3());
					continue;
				}
				if (loseResult.getUser4() == null) {
					loseResult.setUser4(roomStatus.getPlayers().get(player).getUserSeq());
					dao.downRating(loseResult.getUser4());
				}
			}
		}
		//정상적으로 처리가 되면
		if (dao.saveResult(winResult) == 1 && dao.saveResult(loseResult) == 1) {
			return 1;
		}
		//비정상적으로 처리가 되면
		return 0;
	}
}
