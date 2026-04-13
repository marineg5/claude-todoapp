export type TodoId = string;

export type TodoStatus = 'active' | 'completed';

export type FilterType = 'all' | 'active' | 'completed';

export type Todo = {
  id: TodoId;
  text: string;
  status: TodoStatus;
  createdAt: number;
};
