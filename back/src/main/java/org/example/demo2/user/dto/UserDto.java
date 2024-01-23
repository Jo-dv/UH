package org.example.demo2.user.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {//데이터를 담기 위한 자료구조
    private int userId;
    private String id;
    private String password;
    private String nickname;

}
