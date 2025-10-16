"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("API 연결 오류:", err));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">내 Todo 리스트</h1>
      <ul className="space-y-3">
        {todos.length > 0 ? (
          todos.map((t) => (
            <li
              key={t._id}
              className="bg-white shadow p-4 rounded-lg flex justify-between"
            >
              <span>{t.title}</span>
              <span className="text-sm text-gray-500">{t.priority}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">할 일이 없습니다.</p>
        )}
      </ul>
    </main>
  );
}
