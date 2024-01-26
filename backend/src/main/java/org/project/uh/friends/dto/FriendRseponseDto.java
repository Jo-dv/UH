package org.project.uh.friends.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class FriendRseponseDto {
	private int friendsId;
	private int userSeq;
	private String userNickname;
	private boolean friendsState;
}
