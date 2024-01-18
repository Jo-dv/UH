package com.example.member.repository;


import com.example.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    // 아이디로 회원 정보 조회 (select * from users where member_id=?)
    Optional<MemberEntity> findById(int id);
    Optional<MemberEntity> findByMemberNickname(String memberNickname);
//    public String nicknameCheck(String memberNickname) {
//        Optional<MemberEntity> findByMemberNickname(String memberNickname);
//    }
}
