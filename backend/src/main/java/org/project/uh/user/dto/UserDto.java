package org.project.uh.user.dto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {
	private int id;
	private String userId;
	private String userPassword;
	private String userNickname;


	public int getId() {
		this.id = id;
		return id;
	}

	public void setId() {
		this.id = id;
	}

	public String getUserId() {
		this.userId = userId;
		return userId;
	}

	public void setUserId() {
		this.userId = userId;
	}

	public String getUserPassword() {
		this.userPassword = userPassword;
		return userPassword;
	}

	public void setUserPassword() {
		this.userPassword = userPassword;
	}

	public String getUserNickname() {
		this.userNickname = userNickname;
		return userNickname;
	}

	public void setUserNickname() {
		this.userNickname = userNickname;
	}

}
