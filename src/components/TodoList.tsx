import type { Todo } from '@/types/todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <div className="todo-empty" role="status">
        <span className="todo-empty-icon">✓</span>
        <p>할 일이 없습니다</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list" aria-label="할 일 목록">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
