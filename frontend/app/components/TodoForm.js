"use client";

import { useState } from "react";
import axios from "axios";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("중간");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("할 일을 입력해주세요!");

    try {
      const res = await axios.post("http://localhost:5000/api/todos", {
        title,
        priority,
        dueDate,
        completed: false,
      });

      onAdd(res.data); // 상위 컴포넌트(TodoList)에 새 todo 전달
      setTitle("");
      setPriority("중간");
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert("할 일을 추가하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md flex flex-col gap-3 w-full max-w-md"
    >
      <h2 className="text-xl font-semibold">할 일 추가</h2>

      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-lg w-full"
      />

      <div className="flex gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        >
          <option value="낮음">낮음</option>
          <option value="중간">중간</option>
          <option value="높음">높음</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        추가하기
      </button>
    </form>
  );
}
