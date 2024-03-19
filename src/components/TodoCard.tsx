import { infiniteTodo } from "@/types";
import React, { FC } from "react";

// extends를 해주면 <TodoCard 뒤에 속성들 나타남
interface TodoCardProps extends React.HTMLAttributes<HTMLParagraphElement> {
  todo: infiniteTodo;
  // ref양식
  //   아래 ?:를 해야 page 57번째줄이 정상출력
  innerRef?: React.Ref<HTMLParagraphElement>;
}
const TodoCard: FC<TodoCardProps> = ({ todo, innerRef, ...props }) => {
  return (
    <p
      className="bg-red-500  p-4 text-2xl border-2"
      key={todo.id}
      ref={innerRef}
      {...props}
    >
      {todo.title}
    </p>
  );
};

export default TodoCard;
