export type ToDoResponse = ToDo[];

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
