import { TodoFilter } from '@/components/TodoFilter';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { useTodo } from '@/hooks/useTodo';

export function App() {
  const { todos, filter, setFilter, addTodo, toggleTodo, deleteTodo, clearCompleted, activeCount, completedCount } =
    useTodo();

  return (
    <main className="app">
      <div className="app-card">
        <h1 className="app-title">투두리스트</h1>
        <TodoInput onAdd={addTodo} />
        {(activeCount > 0 || completedCount > 0) && (
          <TodoFilter
            filter={filter}
            activeCount={activeCount}
            completedCount={completedCount}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        )}
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}
