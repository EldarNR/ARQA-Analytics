// libraries
import { FC } from "react";
// style
import "@/style/index.scss";

// components
import Todo from "@/components/ToDo";
// providers
import QueryProvider from "@/providers/ReactQueryProvider";

const Home: FC = () => {
  return (
    <QueryProvider>
      <Todo />
    </QueryProvider>
  );
};

export default Home;
