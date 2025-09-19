// components
import TodoForm from "@/components/ToDo/Form";
import TodoList from "@/components/ToDo/List";

const Todo = () => {
  return (
    <div className="todo-app">
      <h1>To-Do App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Todo;
