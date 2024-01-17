package com.example.member.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="users")
public class MemberEntity {
    @Id //pk 저장
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto_increment
    private Long id;

    @Column(unique = true) //unique 제약조건 추가
    private String memberNickname;

    @Column
    private String memberId;

    @Column
    private String memberPassword;
}
