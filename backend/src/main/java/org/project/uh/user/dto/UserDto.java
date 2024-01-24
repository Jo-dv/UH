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
	private int userSeq;
	private String userId;
	private String userPassword;
	private String userNickname;
	private int rating;
}
