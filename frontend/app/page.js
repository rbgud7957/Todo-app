"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext"; // 인증 컨텍스트
import TodoForm from "./components/TodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  // 로그인 안 된 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold">내 Todo 리스트</h1>

        {/* 로그아웃 버튼 */}
        {user && (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
          >
            로그아웃
          </button>
        )}
      </div>

      <TodoForm onAdd={handleAddTodo} />

      <ul className="mt-6 w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500">할 일이 없습니다.</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className="p-3 bg-white rounded-lg shadow mb-2">
              {todo.title}
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
