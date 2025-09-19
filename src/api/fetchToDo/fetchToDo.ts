// libraries
import axios from "axios";
// config
import { BASE_URL } from "@/api/config";

// types
import { ToDoResponse } from "@/api/fetchToDo/type";

export const fetchTodos = async (): Promise<ToDoResponse> => {
  const { data } = await axios.get(`${BASE_URL}/todos?_limit=5`);

  return data;
};
