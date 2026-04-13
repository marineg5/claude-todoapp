import type { Todo } from '@/types/todo';

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  const isCompleted = todo.status === 'completed';

  return (
    <li className={`todo-item${isCompleted ? ' is-completed' : ''}`}>
      <label className="todo-item-label">
        <input
          type="checkbox"
          className="todo-item-checkbox"
          checked={isCompleted}
          onChange={() => onToggle(todo.id)}
          aria-label={`${todo.text} ${isCompleted ? '완료됨' : '진행 중'}`}
        />
        <span className="todo-item-text">{todo.text}</span>
      </label>
      <button
        className="todo-item-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`${todo.text} 삭제`}
      >
        ✕
      </button>
    </li>
  );
}
