"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "../utils/axiosInstance";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", { email, password });
      const accessToken = res.data.tokens.accessToken;

      login(accessToken);
      alert("로그인 성공!");
      router.push("/");
    } catch (err) {
      console.error("로그인 에러:", err.response?.data || err.message);
      alert("로그인 실패: 이메일/비밀번호 확인");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-3">
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

        <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          로그인
        </button>

        <p onClick={() => router.push("/register")} className="text-sm text-blue-600 cursor-pointer text-center mt-2 hover:underline">
          회원가입 하러가기
        </p>
      </form>
    </div>
  );
}
