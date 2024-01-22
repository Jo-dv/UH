package com.example.member.service;

import com.example.member.dto.MemberDTO;
import com.example.member.entity.MemberEntity;
import com.example.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public void join(MemberDTO memberDTO) {
        // 1. dto 객체를 entity 객체로 변환
        // 2. repository의 save 메서드 호출
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity);
        // repository의 save메서드 호출 (조건:  entity 객체를 넘겨줘야 함)

        }

        public MemberDTO login(MemberDTO memberDTO) {
            // 1. 회원이 입력한 아이디로 DB에서 조회를 함
            // 2. DB에서 조회한 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 판단
            Optional<MemberEntity> byMemberId = memberRepository.findById(memberDTO.getId());
            if (byMemberId.isPresent()) {
                // 조회 결과가 있다 (해당 아이디를 가진 회원 정보가 있다)
                MemberEntity memberEntity = byMemberId.get();
                if (memberEntity.getMemberPassword().equals(memberDTO.getMemberPassword())) {
                    // 비밀번호가 일치
                    // entity -> dto 변환 후 리턴
                    MemberDTO dto = MemberDTO.toMemberDTO(memberEntity);
                    return dto;
                } else {
                    // 비밀번호 불일치 (로그인 실패)
                    return null;
                }
            } else {
                // 조회 결과가 없다 (해당 아이디를 가진 회원이 없다)
                return null;
            }
        }

        public List<MemberDTO> findAll() {
            List<MemberEntity> memberEntityList = memberRepository.findAll();
            List<MemberDTO> memberDTOList = new ArrayList<>();
            for (MemberEntity memberEntity : memberEntityList) {
                memberDTOList.add(MemberDTO.toMemberDTO(memberEntity));
            }
            return memberDTOList;
        }

        public MemberDTO findById(Long id) {
            Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(id);
            if (optionalMemberEntity.isPresent()) {
                return MemberDTO.toMemberDTO(optionalMemberEntity.get());
            } else {
                return null;
            }

        }

        public String nicknameCheck(String memberNickname) {
            Optional<MemberEntity> byMemberNickname = memberRepository.findByMemberNickname(memberNickname);
            if (byMemberNickname.isPresent()) {
                // 조회 결과가 있다 -> 사용불가
                return null;
            } else {
                // 조회 결과가 없다 -> 사용할 수 있다
                return "가능";
            }

        }


}
