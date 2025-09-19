// types
import { TodoState } from "@/store/type";
// libraries
import { create } from "zustand";

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  add: (todo) =>
    set((state) => ({
      todos: [todo, ...state.todos],
    })),
  setTodos: (todos) => set(() => ({ todos })),
}));
