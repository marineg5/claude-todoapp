import type { FilterType } from '@/types/todo';

type Props = {
  filter: FilterType;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: FilterType) => void;
  onClearCompleted: () => void;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export function TodoFilter({
  filter,
  activeCount,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: Props) {
  return (
    <div className="todo-filter">
      <span className="todo-filter-count">
        {activeCount}개 남음
      </span>
      <div className="todo-filter-buttons" role="group" aria-label="할 일 필터">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            className={`todo-filter-btn${filter === value ? ' is-active' : ''}`}
            onClick={() => onFilterChange(value)}
            aria-pressed={filter === value}
          >
            {label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className="todo-clear-btn" onClick={onClearCompleted}>
          완료 삭제
        </button>
      )}
    </div>
  );
}
