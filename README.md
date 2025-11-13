# 🧩 Todo App

## 📌 프로젝트 개요  
로그인 기반의 Todo 리스트 웹 애플리케이션입니다.
사용자는 회원가입 후 로그인하여 개인별 할 일 목록을 관리할 수 있으며,
할 일의 등록, 삭제, 수정, 완료 상태를 직관적으로 조작할 수 있습니다.

이 프로젝트는 Next.js (Frontend) 와 Node.js + Express (Backend),
그리고 MongoDB (Database) 를 사용해 풀스택 아키텍처를 직접 구현했습니다.

---

## ⚙️ 기술 스택  
| 영역 | 기술 | 설명 |
|------|------|------ |
| **Frontend** | Next.js 15, React Hooks, Axios, Tailwind CSS |사용자 인터페이스 및 클라이언트 로직 |
| **Backend** | Node.js, Express.js, JWT, bcrypt, dotenv | 인증, 라우팅, 데이터 처리, 환경 변수 관리 |
| **Database** | MongoDB (Mongoose ODM) | 유저 정보 및 Todo 데이터 저장 |
| **통신** | RESTful API + Axios Interceptor | 인증 헤더 자동 주입 및 요청 관리 |
| **개발 편의성** | nodemon, ESLint | 자동 재시작 및 코드 품질 유지 |


## 🧰 기술 스택 상세 활용

### 🖥️ Frontend

#### **Next.js 15**
- App Router 구조로 페이지 라우팅 구성 (`/login`, `/register`, `/`)
- 서버 사이드 렌더링(SSR) 기반으로 초기 렌더링 속도 개선
- `use client`를 사용하여 로그인 상태 및 Todo CRUD 로직 관리

#### **React Hooks**
- `useState`, `useEffect` 등을 활용해 Todo 목록, 로그인 상태, 폼 입력값 등 상태 관리
- 로그인 후 토큰 유지 및 자동 리다이렉트 처리 구현

#### **Axios**
- 백엔드 API와 통신 담당 (`/api/auth`, `/api/todos`)
- `axiosInstance.js`에서 인터셉터를 설정하여 JWT 토큰을 자동으로 요청 헤더에 포함시킴
- 에러 발생 시 콘솔 또는 화면에 메시지 표시

#### **Tailwind CSS**
- 빠른 스타일링 및 반응형 UI 구성
- 버튼, 입력창, 리스트 등 컴포넌트의 일관된 디자인 유지
- `className`으로 직접 유틸리티 클래스 적용

---

### ⚙️ Backend

#### **Node.js**
- 서버 실행 및 비동기 요청 처리 기반
- Express.js, Mongoose, JWT 등 주요 백엔드 패키지를 구동시키는 런타임

#### **Express.js**
- RESTful API 구축의 핵심 프레임워크
- `/api/auth`(로그인/회원가입), `/api/todos`(Todo CRUD) 라우터 구성
- 미들웨어(`cors`, `express.json`)를 이용해 요청/응답 전처리 수행

#### **Mongoose**
- MongoDB와 Node.js를 연결하는 ODM(Object Data Modeling) 라이브러리
- `User.js`와 `Todo.js` 스키마 정의 및 CRUD 작업 담당
- 비밀번호 해시 저장, 사용자별 Todo 구분 처리

#### **JWT (jsonwebtoken)**
- 로그인 시 사용자 인증용 토큰 생성 및 검증 수행
- `authController.js`에서 로그인 성공 시 토큰 발급
- `verifyToken.js` 미들웨어에서 토큰 유효성 검사 수행

#### **bcrypt**
- 회원가입 시 비밀번호를 해시화하여 안전하게 저장
- 로그인 시 입력 비밀번호와 해시 비교 검증 수행

#### **dotenv**
- 데이터베이스 URI, JWT_SECRET 등 민감한 환경 변수 관리
- `.env` 파일로 로컬 환경과 배포 환경을 쉽게 분리

#### **nodemon**
- 백엔드 개발 중 코드 변경 시 서버 자동 재시작
- 개발 효율성과 디버깅 속도 향상

---

### 🗄️ Database

#### **MongoDB (MongoDB Atlas)**
- 클라우드 기반 NoSQL 데이터베이스
- 사용자 정보(User)와 할 일(Todo) 데이터 저장
- `userId` 필드로 로그인한 사용자별 Todo 분리 관리
- Atlas 클러스터 URI를 `.env`에 설정하여 Render 배포와 연동

---

### 🌐 Network & 보안

#### **CORS (Cross-Origin Resource Sharing)**
- 프론트엔드(3000) ↔ 백엔드(5000) 간 요청 허용
- Express 미들웨어로 설정:  
  ```js
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

---
## 🚀 주요 기능 요약

---

### 👤 회원 인증

- 회원가입 시 비밀번호를 **bcrypt**로 안전하게 해시 후 저장  
- 로그인 시 이메일 / 비밀번호 검증 후 **JWT 토큰 발급**  
- 토큰을 **localStorage**에 저장하여 인증 상태 유지  
- **Protected Route** 적용 → 로그인하지 않은 사용자는 Todo 페이지 접근 불가  
- 로그아웃 시 토큰 삭제 및 로그인 페이지로 리다이렉트  

---

### 🧾 Todo 관리 기능 (CRUD)

#### 할 일 추가 (Create)
- 입력창에 할 일 제목 입력 → 서버로 **POST 요청** → DB에 저장  
- 저장 후 즉시 프론트엔드 리스트에 반영  

#### 할 일 조회 (Read)
- 로그인한 사용자의 Todo만 DB에서 불러옴  
- 페이지 로딩 시 **Axios GET 요청**으로 자동 렌더링  

#### 할 일 수정 (Update)
- 제목 클릭 시 **인라인 수정 기능** 추가 예정  
- 완료 상태를 토글(✅ / ❌)로 표시 가능하도록 확장 예정  

#### 할 일 삭제 (Delete)
- 각 항목 옆 “삭제” 버튼 클릭 → 서버로 **DELETE 요청** → DB 반영 및 UI 즉시 갱신  

---

### 🔐 인증 및 보안

- **JWT 기반 인증 구조**
  - Access Token 발급 및 검증 (`verifyToken` 미들웨어 적용)
  - 요청 시 `Authorization: Bearer <token>` 자동 포함  
- 비밀번호는 평문 저장 없이 **bcrypt 해시로 암호화**  
- **CORS 설정**을 통해 Front ↔ Back 간 통신 허용  

---

### 🧠 프론트엔드 구조

- **Next.js 15 (App Router 기반)**
  - `/login` → 로그인 페이지  
  - `/register` → 회원가입 페이지  
  - `/` → 로그인된 사용자의 Todo 메인 페이지  
- **axiosInstance.js**
  - 모든 요청에 JWT 자동 포함 (Axios Interceptor 설정)
- **TodoForm 컴포넌트**
  - 입력 폼, 추가 버튼, 에러 처리, 상태 관리 포함  

---

### 🧩 백엔드 구조

- `routes/auth.js` → 로그인 / 회원가입 라우트 관리  
- `routes/todos.js` → Todo 관련 CRUD API 제공  
- `controllers/authController.js` → JWT 발급 및 로그인 로직 처리  
- `controllers/todoController.js` → DB CRUD 동작 구현  
- `middleware/verifyToken.js` → 토큰 유효성 검증 (보호된 라우트 전용)  
- `models/User.js`, `models/Todo.js` → Mongoose 스키마 정의  

---

### 💡 정리

- 로그인, Todo CRUD, JWT 인증까지 모두 연동 완료  
- 백엔드와 프론트엔드 간 데이터 통신 정상 작동  
- MongoDB 기반의 사용자별 Todo 관리 시스템 구현  

## 🗓️ 현재 구현된 기능

- ✅ 회원가입 / 로그인 / 로그아웃  
- ✅ JWT 인증 및 로그인 유지  
- ✅ Todo 생성 / 조회 / 삭제  
- ✅ 개인별 Todo 분리 (유저별 데이터 관리)  
- ✅ 프론트엔드 ↔ 백엔드 API 완전 연동  
- ✅ MongoDB Atlas 연동 테스트 완료  

---

## 🎯 다음 목표 (예정)

- ✏️ Todo 수정 / 완료 토글 기능 추가  
- 📊 Todo 통계 페이지 (완료율, 총 개수 등) 
- 🌐 Vercel + Render 배포 
- 🔄 Refresh Token 기능 추가  
- 🎨 반응형 디자인 / UX 개선  

---

## 🧩 트러블슈팅 요약

- JWT 만료 시 인증 오류 발생 → 토큰 갱신 및 자동 로그아웃 처리로 해결  
- `todos.map is not a function` 에러 → 응답 데이터 구조를 배열로 통일  
- 클라이언트 예외 처리 누락으로 렌더링 오류 발생 → Axios 인터셉터로 공통 에러 처리  
- MongoDB 및 CORS 설정 문제 → `.env` 및 Express CORS 미들웨어 수정으로 해결  

 ---

## 💬 느낀 점

이번 프로젝트를 통해 **백엔드와 프론트엔드가 실제로 통신하는 구조**를 직접 구현하며  
풀스택 개발의 전체 흐름을 이해할 수 있었습니다.  

특히 **JWT 기반 인증**과 **Next.js App Router 구조**를 다루면서,  
사용자 인증 상태를 유지하고, 로그인한 유저별 데이터를 분리하는 과정을 경험했습니다.  

MongoDB와 Express, Next.js가 어떻게 맞물려 작동하는지 명확히 이해하게 되었고,  
“로그인 → 인증 → Todo CRUD → 로그아웃”까지의 흐름을 스스로 설계하고 완성했다는 점에서  
큰 성취감을 느꼈습니다. 

---
