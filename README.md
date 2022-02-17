😎 Devel-rope 
=============
코드와 매일 같이 싸움하는 개발자들(Developers)을 위한 하늘에서 내려온 동아줄(rope) 같은 앱! 개발자들끼리 다양한 질문을 올리고, 트러블슈팅도 하고, 각종 지식을 공유할 수 있는 커뮤니티 입니다. 😊<br><br>

![텍스트](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzTQqs%2Fbtrtwr4yP6U%2FCAmDLG3G9Nk9pe78oQA7nk%2Fimg.png "Devel-rope")<br><br><br><br>

## ![텍스트](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdyJwn8%2FbtrtAPpuDdu%2FKtweKbXYo9gHezNhVy33p1%2Fimg.png "Devel-rope_Logo")  <br>
- 개발을 하다가 부딪힌 문제를 공유하고 해답을 빠르게 찾을 수 있습니다.
- 서로의 일상을 자유롭게 공유할 수 있습니다.

## 제작 기간 및 팀원 소개
2021-02-11 ~ 2021-02-17
- 김민정 minkimhere : 댓글 및 서버 관련 기능 담당
- 용주성 tacocat3 : 로그인/회원가입 관련 기능 담당
- 박수지 suzyp0223 : 게시글 관련 기능 담당

## Site
[사이트 바로가기](http://devel-rope.site/)

## 데모 영상 링크
[데모영상 바로가기](https://youtu.be/LiMiTonWZqk)

## 노션 설계 페이지
[노션 바로가기](https://lofty-palladium-0d5.notion.site/2-SA-57c267cb80e8418791bd8e42a15d68d7)

## 와이어 프레임 
![텍스트](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FOclKv%2FbtrtACX4X7Z%2Fy8DQBJMYKMPLKQ9hVgww6k%2Fimg.png "와이어프레임")


## Back-end 기술 스택 및 개발 환경
- JavaScript
- Node.js
- Express.js
- mongoose
- mongoose-sequence
- jsonwebtoken
- joi
- pbkdf2-password
- dotenv
- cors
- prettier

`DBMS`
 - mongoDB

`Deploy`
 - AWS EC2 (Ubuntu 18.04LTS)
 - AWS S3


## 💬 Back-end
- 이번 프로젝트는 주특기 주차를 마치고 처음으로 프론트엔드와 백엔드로 나눠서 진행한 프로젝트 입니다.
- 우선적으로 주특기 주차에 배운 기본적인 CRUD기능의 구현에 집중하였고, 세부적으로 내실을 다지는데 집중하였습니다. 


**❓ Why? JWT + Bearer 인증 유형 **

발급한 JWT 토큰은 OAuth 2.0 인증으로 발급한 액세스 토큰이 아니기 때문에 공식적으로 이 방법은 "비표준" 방식으로 볼 수 있습니다. 그렇지만 토큰을 헤더로 교환 할 목적으로 사용할 인증 유형이 Bearer가 제일 적절하다 생각하여 HTTP 인증 유형중, Bearer 타입을 사용하여 토큰을 전달 하는 방법을 사용하였습니다.

**❓ Why? mongoDB**

우선적인 목표를 기본 CRUD 기능 구현과 프론트엔드와 백엔드의 협조적인 협업으로 하였고 추후에 기능을 추가할 계획을 세웠던 저희 프로젝트에서 RDBMS와 다르게 자유로이 데이터 구조를 잡을 수 있다는 특징이 있는 Document 기반 데이터베이스인 mongoDB가 가장 접합하다 판단하였습니다.

**❓ Why? dotenv**

노출되면 보안에 위협적인 환경변수들을 한곳에 모아 관리했습니다.
