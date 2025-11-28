"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "./utils/axiosInstance";
import TodoForm from "./components/TodoForm";
import { AuthContext } from "./context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  const [todos, setTodos] = useState([]);

  // 🔥 로그인 체크 (Protected Route)
  useEffect(() => {
    const token = localStorage.getItem("token");

    // 토큰이 없으면 로그인 페이지로 강제 이동
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  // 🔥 로그인된 상태에서만 Todo 불러오기
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("/todos");
        // 백엔드가 { total, page, totalPages, todos } 형태 반환할 수 있음
        setTodos(res.data.todos || res.data);
      } catch (err) {
        console.error("Todo 불러오기 실패:", err.response?.data || err.message);
      }
    };

    if (isAuthenticated) fetchTodos();
  }, [isAuthenticated]);

  // 🔥 Todo 추가
  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  // 🔥 Todo 삭제
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Todo 삭제 실패:", err.response?.data || err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">내 Todo 리스트</h1>

      {/* 🔥 할 일 입력 폼 */}
      <TodoForm onAdd={handleAddTodo} />

      {/* 🔥 Todo 목록 */}
      <ul className="mt-6 w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500 mt-4">할 일이 없습니다.</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo._id}
              className="p-4 bg-white rounded-lg shadow mb-3"
            >
              {/* 제목 */}
              <p className="font-bold text-lg">{todo.title}</p>

              {/* 카테고리 / 우선순위 / 마감일 */}
              <div className="text-sm text-gray-600 mt-1">
                <p>카테고리: {todo.category}</p>
                <p>우선순위: {todo.priority}</p>
                <p>
                  마감일:{" "}
                  {todo.dueDate ? todo.dueDate.slice(0, 10) : "없음"}
                </p>
              </div>

              {/* 삭제 버튼 */}
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="text-sm text-red-500 hover:underline mt-2"
              >
                삭제
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
