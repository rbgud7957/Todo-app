"use client";

import { useEffect, useState } from "react";
import axios from "./utils/axiosInstance";
import TodoForm from "./components/TodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("/todos");
        setTodos(res.data.todos || res.data);
      } catch (err) {
        console.error("Todo 불러오기 실패:", err.response?.data || err.message);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

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

      <TodoForm onAdd={handleAddTodo} />

      <ul className="mt-6 w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500 mt-4">할 일이 없습니다.</p>
        ) : (
          todos.map((todo) => (
            <li
              key={todo._id}
              className="p-4 bg-white rounded-lg shadow mb-3"
            >
              <p className="font-bold text-lg">{todo.title}</p>

              <div className="text-sm text-gray-600 mt-1">
                <p>카테고리: {todo.category}</p>
                <p>우선순위: {todo.priority}</p>
                <p>
                  마감일:{" "}
                  {todo.dueDate ? todo.dueDate.slice(0, 10) : "없음"}
                </p>
              </div>

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
