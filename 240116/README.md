## 도커 데스크탑 설치

- 윈도우가 최신 버전인지 확인할 것

## 젠킨스 도커 버전 설치

- 도커 컨테이너를 먼저 실행시킬 것
- docker pull jenkins/jenkins → 일반적인 설치 방식으로 항상 최신 버전을 설치
    - 젠킨스는 jdk가 설치된 환경에서 동작
    - docker pull jenkins/jenkins:lts-jdk17 → jdk 버전 지정

## 젠킨스 실행

- docker run -d -p 8080:8080 -p 50000:50000 --name jenkins-server --restart=on-failure jenkins/jenkins:lts-jdk17
    - 백그라운드 실행 옵션
        - -d
    - 외부 접근 옵션
        - -p 외부 포트:내부 포트
        - 컨테이너 내부 포트를 컨테이너 외부 환경에서 어떻게 접근할 것인지
        - 지정한 외부 포트에서 접근하면 지정한 내부 포트에 접근 가능
    - 실패시 재시작 옵션
        - --restart=on-failure
        - fail시 재시작
    - 컨테이너 이름 지정
        - --name option
        - 별도로 지정하지 않으면 임의 생성됨
    - 사용할 젠킨스
        - 계정명/레포지토리명:태그명
        - jenkins/jenkins:lts-jdk11
- 상태 확인
    - docker ps
        - status가 up인지 확인할 것
        - 지속해서 up이 유지되는 것이 중요함

## 젠킨스 접속

- 초기 비번 확인
    - docker logs jenkins-server
    - 혹은 도커 데스크탑의 로그에서 확인 가능
        
        ![Untitled](https://github.com/Jo-dv/Capstone2021/assets/63555689/8e9ac232-151c-43f7-bdd6-2a0fa0b932a4)
        
- 접속 url
    - YUOR-SERVER-PUBLIC-IP:PORT-NUM
        - http://localhost:8080/
- Admin Password
    - 확인한 초기 비번 입력
        
        ![Untitled (1)](https://github.com/Jo-dv/Capstone2021/assets/63555689/861da4ec-97c2-4c98-91f5-b5ee23bb3439)
        
- 기본 설정
    - 플러그인 설치
        - Install suggested plugins
            
            ![Untitled (20)](https://github.com/Jo-dv/Capstone2021/assets/63555689/664e8ccf-ea0c-4eda-8444-9dc235061c75)

            ![Untitled (3)](https://github.com/Jo-dv/Capstone2021/assets/63555689/6fa96205-73bf-4937-971f-648a35ab064b)
            
- 계정 설정

    ![Untitled (4)](https://github.com/Jo-dv/Capstone2021/assets/63555689/e7650243-2c08-4485-8ac6-f0634f7cfd8a)

- Jenkins URL
    - 접속할 URL:Port Number 지정

        ![Untitled (5)](https://github.com/Jo-dv/Capstone2021/assets/63555689/505ba343-1e36-43c7-8f98-39f13c133237)     

## 젠킨스 기본 구성

![Untitled (6)](https://github.com/Jo-dv/Capstone2021/assets/63555689/498693ac-7fa9-4ecd-8c24-9146ab4fbc9b)



- Jenkins 관리
    - 환경설정

        ![Untitled (7)](https://github.com/Jo-dv/Capstone2021/assets/63555689/fc700940-87c6-4a12-babc-3a3c5a202beb)
        
        - Tools
            - 다음과 같은 것들에 대해서 설정 가능
                - Maven
                - JDK
                    - JDK가 설정되어 있지 않으면 우선적으로 해줘야 함
                - Git
                - Gradle
                - Ant
- 아이템
    - 빌드 컴파일 배포의 최소 단위

        ![Untitled (8)](https://github.com/Jo-dv/Capstone2021/assets/63555689/d69193b6-043a-4d63-9607-13f09fe6e53f)
        
    - Freestyle project
        - 기본 플러그인으로 구성

## 빌드 테스트

- 생성한 아이템 선택
- 구성(Configuration)
    - Build Strps
    - Execute shell

    ![Untitled (9)](https://github.com/Jo-dv/Capstone2021/assets/63555689/35293b91-d616-4f1e-96bd-a315067ad837)

- 지금 빌드
    - 빌드 코드 작성 후 대시 보드에서 “지금 빌드” 선택
    - 빌드 결과 확인

        ![Untitled (10)](https://github.com/Jo-dv/Capstone2021/assets/63555689/16ecfb0c-2595-4b0d-9533-a8433462d13a)
        
    - 빌드의 상세 결과 확인 → 번호 옆 드롭박스 Console Output
        
                
        ![Untitled (11)](https://github.com/Jo-dv/Capstone2021/assets/63555689/83289b89-dc30-4aa2-838b-ad7683defc3e)       

## 도커 터미널에서 확인

- docker exec -it [컨테이너 네임 or 컨테이너 id] shell
    
            
    ![Untitled (12)](https://github.com/Jo-dv/Capstone2021/assets/63555689/f1aafb19-9b9d-41bc-a394-bcd38a4c6939)
    
- 별도로 packaging을 안 했기 때문에 결과물 없음

## Git, Maven 연결

- Maven
    - Plugins

        ![Untitled (13)](https://github.com/Jo-dv/Capstone2021/assets/63555689/e756d322-447d-448f-b8bd-43036f88e78b)
        
        ![Untitled (14)](https://github.com/Jo-dv/Capstone2021/assets/63555689/389589aa-2a74-43db-93b4-d1c892117a3d)

        
        ![Untitled (15)](https://github.com/Jo-dv/Capstone2021/assets/63555689/8c691e28-6477-4b1a-aa82-1b457b51cfef)
        
    - Tools
        - 설정 후 Save
        
        ### Maven 프로젝트 생성

        ![Untitled (21)](https://github.com/Jo-dv/Capstone2021/assets/63555689/e75a3413-a5d5-40e2-820f-feea53889df5)

        ![Untitled (16)](https://github.com/Jo-dv/Capstone2021/assets/63555689/cdd592e7-c43d-472a-9fe6-e7a107f74565)
        
        ![Untitled (17)](https://github.com/Jo-dv/Capstone2021/assets/63555689/6f5d2de9-a2df-4997-b1ff-47b05a075998)
        
        - 결과물의 형태는 pom.xml의 package에 따름
          
        ![Untitled (18)](https://github.com/Jo-dv/Capstone2021/assets/63555689/524be33a-04d7-42de-8ce8-b14b29e698a3)
        
        ![Untitled (19)](https://github.com/Jo-dv/Capstone2021/assets/63555689/827c9d57-fd49-49b6-a4ae-29cb9d72696f)
