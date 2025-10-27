"use client";

import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post("/todos", { title });
      onAdd(res.data);
      setTitle("");
    } catch (err) {
      console.error("Todo 추가 실패:", err.response?.data || err.message);
      alert("할 일 추가 중 오류 발생");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="새 할 일을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border p-2 rounded-lg"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        추가
      </button>
    </form>
  );
}
