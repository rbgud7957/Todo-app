"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../utils/axiosInstance";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        email,
        password,
      });

      alert("회원가입 성공! 로그인해주세요.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: 이미 존재하는 이메일일 수 있습니다.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3"
      >
        <h1 className="text-2xl font-bold text-center mb-2">회원가입</h1>

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
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          회원가입
        </button>

        <p
          onClick={() => router.push("/login")}
          className="text-sm text-blue-600 cursor-pointer text-center mt-2 hover:underline"
        >
          로그인 페이지로
        </p>
      </form>
    </div>
  );
}

