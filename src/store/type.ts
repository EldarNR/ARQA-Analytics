type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoState = {
  todos: Todo[];
  add: (todo: Todo) => void;
  setTodos: (todos: Todo[]) => void;
};
