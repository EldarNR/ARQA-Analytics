// libraries
import axios from "axios";
// config
import { BASE_URL } from "@/api/config";

// type
import { ToDo } from "@/api/addToDo/type";

export const addTodo = async (title: string): Promise<ToDo> => {
  const res = await axios.post(`${BASE_URL}/todos`, {
    title,
    completed: false,
  });

  return res.data;
};
