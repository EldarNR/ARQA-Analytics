// libraries
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

//api
import { addTodo } from "@/api/addToDo/addToDo";
//store
import { useTodoStore } from "@/store";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const add = useTodoStore((state) => state.add);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      add(newTodo);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      mutation.mutate(title);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-form--input"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
        type="text"
        value={title}
      />
      <button className="todo-form--button" type="submit">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
