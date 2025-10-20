"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // JWT 토큰 저장
      localStorage.setItem("token", res.data.token);

      alert("로그인 성공!");
      router.push("/"); // 메인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("로그인 실패. 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3"
      >
        <h1 className="text-2xl font-bold text-center mb-2">로그인</h1>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          로그인
        </button>

        <p
          onClick={() => router.push("/register")}
          className="text-sm text-blue-600 cursor-pointer text-center mt-2 hover:underline"
        >
          회원가입 하러가기
        </p>
      </form>
    </div>
  );
}
