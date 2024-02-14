package org.project.uh.user.dto;

import java.util.List;

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
public class MypageDto {
	private int userSeq;
	private String userId;
	private String userNickname;
	private int rating;
	private int myRank;
	private List<RecordDto> record;
}