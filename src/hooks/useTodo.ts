import { useOptimistic, useState, useTransition } from 'react';
import type { FilterType, Todo, TodoId, TodoStatus } from '@/types/todo';
import { loadTodos, saveTodos } from '@/utils/storage';

const MAX_TODO_LENGTH = 200;

function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    status: 'active',
    createdAt: Date.now(),
  };
}

type OptimisticAction = { id: TodoId; status: TodoStatus };

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterType>('all');
  const [, startTransition] = useTransition();

  const [optimisticTodos, applyOptimistic] = useOptimistic(
    todos,
    (state: Todo[], { id, status }: OptimisticAction) =>
      state.map((t) => (t.id === id ? { ...t, status } : t))
  );

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > MAX_TODO_LENGTH) return;
    const next = [...todos, createTodo(trimmed)];
    setTodos(next);
    saveTodos(next);
  };

  const toggleTodo = (id: TodoId) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const nextStatus: TodoStatus = todo.status === 'active' ? 'completed' : 'active';
    startTransition(() => {
      applyOptimistic({ id, status: nextStatus });
      const next = todos.map((t) => (t.id === id ? { ...t, status: nextStatus } : t));
      setTodos(next);
      saveTodos(next);
    });
  };

  const deleteTodo = (id: TodoId) => {
    const next = todos.filter((t) => t.id !== id);
    setTodos(next);
    saveTodos(next);
  };

  const clearCompleted = () => {
    const next = todos.filter((t) => t.status === 'active');
    setTodos(next);
    saveTodos(next);
  };

  const filtered = optimisticTodos.filter((t) => {
    if (filter === 'active') return t.status === 'active';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const activeCount = todos.filter((t) => t.status === 'active').length;
  const completedCount = todos.filter((t) => t.status === 'completed').length;

  return {
    todos: filtered,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    activeCount,
    completedCount,
  };
}
