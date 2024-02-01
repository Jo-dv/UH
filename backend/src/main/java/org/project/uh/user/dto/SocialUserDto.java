package org.project.uh.user.dto;

import java.time.LocalDateTime;

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
public class SocialUserDto {
	private int tokenId;
	private int userSeq;
	private int socialProvider;
	private String socialUserId;
	private String accessToken;
	private LocalDateTime expiresIn;
}
