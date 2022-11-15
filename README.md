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
- [Commit message](#commit-message)
- [ERD](#erd)
- [.env](#env)

<br>
  
## 실행 방법
```

```

<br>

## 기술 스택

---

### - Language

Javascript
Typescript

### - DataBase

MySQL
TypeORM

### - Etc

RestAPI
Nest.JS
Docker
Swagger

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
<p><img src="https://user-images.githubusercontent.com/105836661/201845690-9180d10a-1a27-4865-9f86-ca0e3cdf1b72.png"  width="417" ></p>

---

<br>

## .env

---

```

# DB config

DATABASE_HOST=backend-database
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

```
