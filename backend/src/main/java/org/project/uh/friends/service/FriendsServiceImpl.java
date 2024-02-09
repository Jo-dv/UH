package org.project.uh.friends.service;

import java.util.List;

import org.project.uh.friends.dao.FriendsDao;
import org.project.uh.friends.dto.FriendRequestDto;
import org.project.uh.friends.dto.FriendRseponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendsServiceImpl implements FriendsService {

	private final FriendsDao friendsDao;

	@Override
	public ResponseEntity<String> sendRequest(FriendRequestDto friendRequestDto) {
		//친구 상태를 먼저 확인
		if (friendsDao.checkFriends(friendRequestDto) == 1) {
			return new ResponseEntity<>("이미 요청되었거나 친구 상태입니다.", HttpStatus.BAD_REQUEST);
		}

		//친구 요청이 가능한 상황이라면
		if (friendsDao.sendRequest(friendRequestDto) == 1) {
			return new ResponseEntity<>("정상적으로 친구 요청을 했습니다.", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("비정상적인 요청입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public List<FriendRseponseDto> listFriends(int userSeq) {
		List<FriendRseponseDto> toList = friendsDao.listToFriends(userSeq);
		List<FriendRseponseDto> fromList = friendsDao.listFromFriends(userSeq);

		//from_user_seq와,to_user_seq를 기준으로 각각 리스트를 불러온 후 합치고 친구 등록 순서를 기준으로 정렬한다
		fromList.addAll(toList);
		fromList.sort((e1, e2) -> e1.getFriendsId() - e2.getFriendsId());
		return fromList;
	}

	@Override
	public ResponseEntity<String> acceptFriends(int friendsId) {
		if (friendsDao.acceptFriends(friendsId) == 1) {
			return new ResponseEntity<>("정상적으로 수락되었습니다", HttpStatus.OK);
		}
		return new ResponseEntity<>("비정상적인 요청입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> deleteFriends(int friendsId) {
		if (friendsDao.deleteFriends(friendsId) == 1) {
			return new ResponseEntity<>("정상적으로 처리되었습니다.", HttpStatus.OK);
		}
		return new ResponseEntity<>("비정상적인 요청입니다.", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
