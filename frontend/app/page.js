"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "./context/AuthContext";
import TodoForm from "./components/TodoForm";
import axios from "./utils/axiosInstance";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchTodos();
    }
  }, [router]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("/todos");
      setTodos(res.data.todos || []);
    } catch (err) {
      console.error("Todo 불러오기 실패:", err.response?.data || err.message);
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("삭제 실패:", err.response?.data || err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between w-full max-w-md mb-6">
        <h1 className="text-3xl font-bold">내 Todo 리스트</h1>
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
            <li
              key={todo._id}
              className="p-3 bg-white rounded-lg shadow mb-2 flex justify-between items-center"
            >
              {todo.title}
              <button
                onClick={() => handleDeleteTodo(todo._id)}
                className="text-sm text-red-500 hover:underline"
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
