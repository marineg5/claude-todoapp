import { useActionState } from 'react';

type Props = {
  onAdd: (text: string) => void;
};

export function TodoInput({ onAdd }: Props) {
  const [, formAction, isPending] = useActionState(
    (_prev: null, formData: FormData) => {
      const text = formData.get('todo') as string;
      onAdd(text);
      return null;
    },
    null
  );

  return (
    <form action={formAction} className="todo-input-form">
      <input
        name="todo"
        type="text"
        className="todo-input"
        placeholder="할 일을 입력하세요..."
        maxLength={200}
        required
        disabled={isPending}
        aria-label="새 할 일 입력"
      />
      <button type="submit" className="todo-input-btn" disabled={isPending} aria-label="할 일 추가">
        추가
      </button>
    </form>
  );
}
