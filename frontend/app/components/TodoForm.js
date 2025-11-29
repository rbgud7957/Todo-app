"use client";

import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("etc");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post("/todos", {
        title,
        category,
        priority,
        dueDate,
      });

      onAdd(res.data.todo);

      setTitle("");
      setCategory("etc");
      setPriority("medium");
      setDueDate("");
    } catch (err) {
      console.error("Todo 추가 실패:", err.response?.data || err.message);
      alert("할 일 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-4 rounded-lg shadow flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="새 할 일을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-lg"
        required
      />

      <div className="flex gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
        >
          <option value="work">일</option>
          <option value="personal">개인</option>
          <option value="study">공부</option>
          <option value="etc">기타</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-1 border p-2 rounded-lg"
        >
          <option value="high">높음</option>
          <option value="medium">보통</option>
          <option value="low">낮음</option>
        </select>
      </div>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 rounded-lg"
      />

      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        추가
      </button>
    </form>
  );
}
