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

## 💬 느낀 점

이번 프로젝트를 통해 **백엔드와 프론트엔드가 실제로 통신하는 구조**를 직접 구현하며  
풀스택 개발의 전체 흐름을 이해할 수 있었습니다.  

특히 **JWT 기반 인증**과 **Next.js App Router 구조**를 다루면서,  
사용자 인증 상태를 유지하고, 로그인한 유저별 데이터를 분리하는 과정을 경험했습니다.  

MongoDB와 Express, Next.js가 어떻게 맞물려 작동하는지 명확히 이해하게 되었고,  
“로그인 → 인증 → Todo CRUD → 로그아웃”까지의 흐름을 스스로 설계하고 완성했다는 점에서  
큰 성취감을 느꼈습니다. 

---
