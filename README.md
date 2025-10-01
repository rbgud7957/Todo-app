# 📝 To-Do App (Node.js + MongoDB)

## 📌 프로젝트 소개
이 프로젝트는 **Node.js (Express)** 와 **MongoDB (Mongoose)** 를 기반으로 한 **To-Do 관리 애플리케이션**입니다.  
JWT 인증을 활용하여 **로그인 기반 개인 할 일 관리**가 가능하며, **카테고리 분류, 우선순위, 통계, 검색/필터/정렬/페이징**까지 지원합니다.  

---

## ⚙️ 기술 스택
- **Node.js (Express)** - 서버 백엔드 프레임워크
- **MongoDB (Mongoose)** - 데이터베이스
- **JWT (jsonwebtoken)** - 인증 및 권한 관리
- **bcrypt** - 비밀번호 해싱
- **dotenv** - 환경변수 관리

---

## 🧑‍💻 주요 기능

### 1. 인증 및 사용자 관리
- 회원가입 / 로그인 (JWT 토큰 발급)
- 로그인 상태 확인 (Middleware)
- 비밀번호 변경 (현재 비밀번호 확인 후 새 비밀번호로 변경)

### 2. Todo 관리
- Todo 생성 (제목, 완료 여부, 마감일, 우선순위, 카테고리)
- Todo 조회 (본인 소유만, 카테고리별 필터 가능)
- Todo 수정 (본인 소유만)
- Todo 삭제 (본인 소유만)

### 3. 통계
- 전체 할 일 개수
- 완료된 할 일 개수
- 오늘 마감 할 일 개수
- 우선순위별 통계 (low/medium/high)
- 카테고리별 통계

### 4. 고급 기능
- 검색 (`?title=공부`)
- 필터 (`?priority=high&completed=true`)
- 정렬 (`?sort=-dueDate`)
- 페이징 (`?page=2&limit=10`)
