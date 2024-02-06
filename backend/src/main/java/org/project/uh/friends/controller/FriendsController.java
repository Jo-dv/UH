package org.project.uh.friends.controller;

import java.util.List;

import org.project.uh.friends.dto.FriendRequestDto;
import org.project.uh.friends.dto.FriendRseponseDto;
import org.project.uh.friends.service.FriendsService;
import org.project.uh.user.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/friends", produces = "application/json; charset=UTF8")
@Tag(name = "친구 api")
public class FriendsController {

	private final FriendsService friendsService;

	@Operation(
		summary = "친구 목록",
		description = "본인이 친구 요청을 보냈을 때는 요청을 수락한 친구 목록을 가져오고<br>"
			+ "본인이 요청을 받았을 땐 친구 요청과 수락된 친구의 목록을 가져온다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 친구 목록을 불러왔습니다."),
		@ApiResponse(responseCode = "401", description = "로그인 정보가 없습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 접근")
	})
	@GetMapping
	public ResponseEntity<List<FriendRseponseDto>> listFriends(@SessionAttribute(name = "user") UserDto user) {
		try {
			return new ResponseEntity<>(friendsService.listFriends(user.getUserSeq()), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Operation(
		summary = "친구 요청",
		description = "이미 친구이거나 요청이 간 상태인지 확인하고<br>"
			+ "아니라면 친구 요청을 보낸다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 친구 요청을 했습니다."),
		@ApiResponse(responseCode = "400", description = "이미 요청되었거나 친구 상태입니다."),
		@ApiResponse(responseCode = "401", description = "로그인 정보가 없습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 요청입니다.")
	})
	@PostMapping
	public ResponseEntity<String> sendRequest(@RequestBody FriendRequestDto friendRequestDto,
		@SessionAttribute(name = "user") UserDto user) {
		friendRequestDto.setFromUserSeq(user.getUserSeq());

		return friendsService.sendRequest(friendRequestDto);
	}

	@Operation(
		summary = "친구 수락",
		description = "친구 요청을 수락한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 친구 수락을 했습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 요청입니다.")
	})
	@PutMapping("/{friendsId}")
	public ResponseEntity<String> acceptFriends(@PathVariable int friendsId) {
		return friendsService.acceptFriends(friendsId);
	}

	@Operation(
		summary = "친구 거부/삭제",
		description = "친구 목록에서 삭제하거나 요청을 거부한다."
	)
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "정상적으로 처리되었습니다."),
		@ApiResponse(responseCode = "500", description = "비정상적인 요청입니다.")
	})
	@DeleteMapping("/{friendsId}")
	public ResponseEntity<String> deleteFriends(@PathVariable int friendsId) {
		return friendsService.deleteFriends(friendsId);
	}
}
