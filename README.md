# 📝 Todo App (Node.js + MongoDB + JWT)

이 프로젝트는 **회원가입 / 로그인 (JWT 인증)** 기능과 **Todo CRUD** 기능을 갖춘 간단한 REST API 서버입니다.  
Postman으로 쉽게 테스트할 수 있습니다.

---

## 🚀 기술 스택
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Json Web Token) 인증
- bcrypt (비밀번호 해싱)
- dotenv (환경 변수 관리)

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


✅ 기능 요약  

회원가입 (비밀번호 해싱)  

로그인 (JWT 발급)  

JWT 기반 인증 미들웨어  

사용자별 Todo CRUD  

MongoDB 데이터 영속성  

+ Todo 통계 기능 추가
