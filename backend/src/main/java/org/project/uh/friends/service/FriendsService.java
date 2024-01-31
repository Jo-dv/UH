package org.project.uh.friends.service;

import java.util.List;

import org.project.uh.friends.dto.FriendRequestDto;
import org.project.uh.friends.dto.FriendRseponseDto;
import org.springframework.http.ResponseEntity;

public interface FriendsService {
	public ResponseEntity<String> sendRequest(FriendRequestDto friendRequestDto);

	public List<FriendRseponseDto> listFriends(int userSeq);

	public ResponseEntity<String> acceptFriends(int friendsId);

	public ResponseEntity<String> deleteFriends(int friendsId);

}
