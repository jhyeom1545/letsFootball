## 프로젝트 소개

---

### letsFootball

- 축구 관련 글을 게시판에 작성할 수 있습니다.
- 댓글 작성으로 서로 소통하며 축구를 할 수 있는 멤버를 서로 찾습니다.

<br>

## 목차

---

- [실행 방법](#실행-방법)
- [기술 스택](#기술-스택)
- [코드 컨벤션](#코드-컨벤션)
- [API](#api)
- [테스트 코드](#테스트-코드)
- [Commit message](#commit-message)
- [ERD](#erd)
- [.env](#env)

<br>
  
## 실행 방법
```
git clone https://github.com/jhyeom1545/letsFootball.git
```

#### letsFootball

```
docker compose up --build
```

<br>

## 기술 스택

---

<br>
<div align='center'> 🖥&nbsp&nbsp&nbsp사용한 기술 스택</div>
<br>
<p align="center">
📑&nbsp&nbsp&nbsp구성 언어
  </p>
<p align="center">
  <img src="https://img.shields.io/badge/typescript-02569B?style=for-the-badge&logo=typescript&logoColor=white">

  </p>
 <p align="center">
💾&nbsp&nbsp&nbsp 데이터
  </p>
<p align="center">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/typeorm-c03b28?style=for-the-badge&logo=typeorm&logoColor=white"> 
  </p>
<p align="center">
  🚂  &nbsp&nbsp 서버

  </p>
<p align="center">
  <img src="https://img.shields.io/badge/restapi-D33A3F?style=for-the-badge&logo=restful&logoColor=white">
  <img src="https://img.shields.io/badge/nestjs-D33A3F?style=for-the-badge&logo=nestjs&logoColor=white">
  <img src="https://img.shields.io/badge/docker-3c90e5?style=for-the-badge&logo=docker&logoColor=white"> 
  <img src="https://img.shields.io/badge/swagger-6b8d1f?style=for-the-badge&logo=swagger&logoColor=white">
  </p>

<p align="center">
🚀&nbsp&nbsp&nbsp 배포 </div>
<p>
<p align="center">
    <img src="https://img.shields.io/badge/gcp-d44a33?style=for-the-badge&logo=googlecloud&logoColor=yellow"> 
    </p>

<br>

## 코드 컨벤션

---

### 변수, 함수명, 파일명

camelCase 사용

### 클래스, 인터페이스, enum

PascalCase 사용

<br>

## API

---

<br>

### **Auth**

|  METHOD  |                     URL                      |                           PARAMETER                           |       RETURN        |    DESCRIPTION     |
| :------: | :------------------------------------------: | :-----------------------------------------------------------: | :-----------------: | :----------------: |
| **POST** |       http://localhost:3000/api/login        | [loginInput](./letsfootball/src/apis/auth/dto/login.input.ts) | String(액세스 토큰) |       로그인       |
| **POST** | http://localhost:3000/api/restoreAccessToken |                               -                               | String(액세스 토큰) | 액세스 토큰 재발급 |

<br>

### **Board**

|   METHOD   |                  URL                   |                                     PARAMETER                                      |                               RETURN                                |   DESCRIPTION    |
| :--------: | :------------------------------------: | :--------------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :--------------: |
|  **POST**  |    http://localhost:3000/api/board     |    [CreateBoardInput](./letsfootball/src/apis/comment/dto/createBoard.input.ts)    |  [Board](./letsfootball/src/apis/comment/entities/board.entity.ts)  |  게시글을 생성   |
|  **GET**   | http://localhost:3000/api/board/{page} |                                        page                                        | [Board[]](./letsfootball/src/apis/comment/entities/board.entity.ts) | 게시글 전체 조회 |
|  **GET**   |  http://localhost:3000/api/board/{id}  |                                         id                                         |  [Board](./letsfootball/src/apis/comment/entities/board.entity.ts)  |   게시글 조회    |
| **PATCH**  |  http://localhost:3000/api/board/{id}  |    [UpdateBoardInput](./letsfootball/src/apis/comment/dto/updateBoard.input.ts)    |  [Board](./letsfootball/src/apis/comment/entities/board.entity.ts)  |   게시글 수정    |
| **DELETE** |  http://localhost:3000/api/board/{id}  | [DeleteBoardInput](./letsfootball/src/apis/comment/dto/deleteBoard.input.input.ts) |                               boolean                               |  게시글을 삭제   |

<br>

### **Comment**

|   METHOD   |                      URL                      |                                    PARAMETER                                     |                                 RETURN                                  |       DESCRIPTION       |
| :--------: | :-------------------------------------------: | :------------------------------------------------------------------------------: | :---------------------------------------------------------------------: | :---------------------: |
|  **POST**  |       http://localhost:3000/api/comment       |  [CreateFeedInput](./letsfootball/src/apis/comment/dto/createComment.input.ts)   |  [Comment](./letsfootball/src/apis/comment/entities/comment.entity.ts)  |        댓글 생성        |
|  **GET**   |  http://localhost:3000/api/comment/{boardId}  |                                     boardId                                      | [Comment[]](./letsfootball/src/apis/comment/entities/comment.entity.ts) | 게시글의 전체 댓글 조회 |
|  **GET**   | http://localhost:3000/api/comment/{commentId} |                                    commentId                                     |  [Comment](./letsfootball/src/apis/comment/entities/comment.entity.ts)  |        댓글 조회        |
| **PATCH**  | http://localhost:3000/api/comment/{commentId} |  [UpdateCommentInput](./letsfootball/src/apis/comment/dto/updateFeed.input.ts)   |  [Comment](./letsfootball/src/apis/comment/entities/comment.entity.ts)  |        댓글 수정        |
| **DELETE** | http://localhost:3000/api/comment/{commentId} | [DeleteCommentInput](./letsfootball/src/apis/comment/dto/deleteComment.input.ts) |                                 boolean                                 |        댓글 삭제        |

<br>

### **User**

|   METHOD   |              URL               |                                PARAMETER                                |                           RETURN                           |  DESCRIPTION   |
| :--------: | :----------------------------: | :---------------------------------------------------------------------: | :--------------------------------------------------------: | :------------: |
|  **POST**  | http://localhost:3000/api/user | [CreateUserInput](./letsfootball/src/apis/auth/dto/createUser.input.ts) | [User](letsfootball/src/apis/user/entities/user.entity.ts) | 유저 회원 가입 |
|  **GET**   | http://localhost:3000/api/user |                                  email                                  | [User](letsfootball/src/apis/user/entities/user.entity.ts) |   유저 조회    |
| **PATCH**  | http://localhost:3000/api/user | [UpdateUserInput](./letsfootball/src/apis/user/dto/updateUser.input.ts) | [User](letsfootball/src/apis/user/entities/user.entity.ts) | 유저 정보 수정 |
| **DELETE** | http://localhost:3000/api/user |                                  email                                  |                          boolean                           | 유저 회원 탈퇴 |

<br>

## 테스트 코드

### [user.service 테스트 코드 작성](letsFootball/src/apis/user/**test**/users.service.spec.ts)

### [board.service 테스트 코드 작성](letsFootball/src/apis/board/**test**/boards.service.spec.ts)

---

<br>

## Commit message

---

- Init : 프로젝트 초기 환경 구축
- Add : 기능 신규 개발
- Modify : 기존 기능 수정
- Refactor : 기존 기능 개선
- Fix : 버그 수정
- Remove : 불필요한 로직,폴더,파일 제거
- Doc : README 수정

<br>

## ERD

<p><img src="https://user-images.githubusercontent.com/105836661/201884884-7309ca8a-5eee-455f-87e6-6f7d86fe6e65.png"width=500></p>

---

<br>

## .env

---

```
# letsFootball/.env

# DB config

DATABASE_HOST=letsfootball-database
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=1545
DATABASE_DATABASE=letsfootball

# JWT config

JWT_ACCESS_KEY=access
JWT_ACCESS_EXPIRATION=2h
JWT_REFRESH_KEY=refresh
JWT_REFRESH_EXPIRATION=10h

# Cors config

ALLOW_ORIGIN_URL=http://localhost:3000

```
