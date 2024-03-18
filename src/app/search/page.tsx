"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Todo } from "@/types";

const SearchPage = () => {
  const [searchItem, setSearchItem] = useState("");

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/todos");
      const results = await response.json();
      return results;
    },
  });
  if (isLoading) {
    return <div>로딩중입니다..!.!.!.!.!.!.!.!</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const filteredTodos = todos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="bg-white flex justify-center min-h-screen py-16">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8">검색 페이지</h1>
        <p className="text-lg mb-4"> 검색 기능추가</p>
        <form className="flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchItem}
            onChange={handleSearchChange}
            className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            검색
          </button>
        </form>
        <div>
          {filteredTodos.map((todo: Todo) => (
            <div
              key={todo.id}
              className="bg-blue-400 p-4 mb-4 text-black border-4 border-red-400"
            >
              <div className="text-xl font-semibold mb-2">
                제목: {todo.title}
              </div>
              <div className="mb-4">내용:{todo.contents}</div>
              Done:{todo.isDone ? <p>Done</p> : <p>Not done</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
