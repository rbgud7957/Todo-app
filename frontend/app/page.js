"use client";

import { useState } from "react";
import TodoForm from "./components/TodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">내 Todo 리스트</h1>
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
