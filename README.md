# 📝 Todo App (Node.js + Express + MongoDB)

JWT 인증을 기반으로 한 Todo 관리 백엔드 프로젝트입니다.  
회원가입/로그인, Todo CRUD, 우선순위 & 카테고리 관리, 통계 기능을 제공합니다.

---

📌 기술 스택

Node.js

Express

MongoDB + Mongoose

JWT 인증

Postman (API 테스트)

## 🚀 주요 기능

### ✅ 인증 (Authentication)
- 회원가입 / 로그인
- JWT 기반 인증
- 사용자 Role(`user`, `admin`) 기반 권한 관리

### ✅ Todo 관리
- 할 일 추가 / 조회 / 수정 / 삭제 (CRUD)
- 각 Todo는 로그인한 사용자와 연결됨
- 필드:
  - `title` (할 일 제목, 필수)
  - `completed` (완료 여부, 기본값: false)
  - `dueDate` (마감일, 선택)
  - `priority` (우선순위: `low`, `medium`, `high`)
  - `category` (카테고리, 선택)
  - `user` (작성자 ID, 필수)

### ✅ 통계 API
- 전체 Todo 개수
- 완료된 Todo 개수 및 완료율
- 오늘 마감 Todo 개수
- 우선순위별 Todo 개수
- 카테고리별 Todo 개수

---

📌 API 사용법 (Postman 예시)
1. 회원가입
POST http://localhost:5000/api/auth/register

2. 로그인 (JWT 발급)
POST http://localhost:5000/api/auth/login

3. Todo CRUD
   
POST /api/todos → 할 일 생성

GET /api/todos → 할 일 조회  

PUT /api/todos/:id → 할 일 수정  

DELETE /api/todos/:id → 할 일 삭제  
MongoDB 데이터 영속성  

---

📖 향후 개선 방향

- 카테고리 설정   // 완료
- 필터링 및 정렬 기능 - 진행
- 비밀번호 재설정 기능 - 진행
- Refresh Token 적용
- 프론트엔드 (React or Next.js) 연결
- 관리자 전용 대시보드 (전체 사용자 관리)
