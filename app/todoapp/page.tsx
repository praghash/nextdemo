'use client';

import { useState, useCallback, useRef } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Add new todo
  const addTodo = useCallback(() => {
    if (!input.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input,
      completed: false,
      createdAt: new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput('');
    inputRef.current?.focus();
  }, [input]);

  // Toggle todo completion status
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Calculate stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="container">
      <div className="header">
        <h1>TodoApp</h1>
        <p>Stay organized and track your tasks</p>
      </div>

      <div className="stats-card">
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-number stat-total">{totalTodos}</p>
            <p className="stat-label">Total Tasks</p>
          </div>
          <div className="stat-item">
            <p className="stat-number stat-completed">{completedTodos}</p>
            <p className="stat-label">Completed</p>
          </div>
          <div className="stat-item">
            <p className="stat-number stat-pending">{pendingTodos}</p>
            <p className="stat-label">Pending</p>
          </div>
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button
            onClick={addTodo}
            className="add-btn"
          >
            Add
          </button>
        </div>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <ul className="todos">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="todo-item"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />

                <span
                  className={`todo-text ${
                    todo.completed ? 'completed' : ''
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-btn"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="footer">
        <p>Press Enter or click Add to create a task</p>
      </div>
    </div>
  );
}