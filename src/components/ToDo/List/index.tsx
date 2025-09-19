// libraries
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// api
import { fetchTodos } from "@/api/fetchToDo/fetchToDo";
//store
import { useTodoStore } from "@/store";

const TodoList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);

  useEffect(() => {
    if (data) {
      console.log(data);
      setTodos(data);
    }
  }, [data, setTodos]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li className="border-b py-2" key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
