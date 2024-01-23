# FE TODO
## Fronted git rule
1. 작업 전에, 해당 기능 branch로 이동
2. 매일 5시, fe_dev에 작업결과를 merge하기
   
## fe_dev에 브랜치 분리하여 작업하기
- ### 원격 저장소 변경사항 최신화
  ```
  git remote update
  ```
- ### 브랜치 이동
  ```
  git switch 브랜치이름
  ```
  혹은
  ```
  git checkout 브랜치이름
  ```
  
- ### 브랜치 만들고 이동
  ```
  git switch -c 브랜치이름
  ```
  혹은
  ```
  git branch 브랜치이름 
  git checkout 브랜치이름
  ```
  

## TODO List
- Page
    - 게임방 page_playRoom
    - 대기방 page_waitingRoom
    - 로비 page_lobby
    - 랭킹 page_ranking
    
- Modal
    - 로그인 modal_signIn
    - 회원가입 modal_signUp
    - 닉네임 modal_nickname
    - 방 생성/설정 modal_createRoom
    - 피드백 modal_feedback
    - 친구 찾기/받은 신청 modal_friend
    - 공용 모달 modal_public
        - 로그아웃
        - 방 나가기
        - 네트워크 에러
        - 카메라 off
        - 친구 초대
        
- Component
    - 채팅 component_chatting