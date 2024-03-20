"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabase";
// import { Database } from "@/types/supabase";
import { useInView } from "react-intersection-observer";
import ChallengeCard from "@/components/ChallengeCard";

const SearchPage = () => {
  // const [searchItem, setSearchItem] = useState("");
  const { ref, inView } = useInView();

  const {
    data,
    // isLoading: challengesLoading,
    // isError: challengesError,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["challenges"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const { data: supabaseData, error } = await supabase
        .from("challenges")
        .select("*")
        // order빼먹지말자
        .order("id")
        // .range((pageParam - 1) * 10 + 1, pageParam * 10);
        .range((pageParam - 1) * 10, pageParam * 10 - 1);

      console.log("pageParam", pageParam);
      console.log("data111111", supabaseData);
      if (error) {
        throw new Error(error.message);
      }
      return { supabaseData, nextPage: pageParam + 1 };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage", lastPage);
      // console.log("allPages", allPages);
      //   return lastPage;  여기에 1,2,3
      //   return allPages.length + 1;
      // return 20 + 1;
      // const nextPage = lastPage.length ? allPages.length : undefined;

      // console.log("nextPage", nextPage);
      return lastPage.nextPage;
    },
  });
  console.log("data", data);
  const content = data?.pages.map(({ supabaseData: totalChallenge }: any) =>
    totalChallenge.map((challenge: any, index: any) => {
      if (totalChallenge.length == index + 1) {
        return (
          <ChallengeCard
            innerRef={ref}
            key={challenge.id}
            challenge={challenge}
          />
        );
      }
      return <ChallengeCard key={challenge.id} challenge={challenge} />;
    })
  );
  console.log("content", content);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("------------------------------------------------------");
      console.log("Fire!");
      console.log("------------------------------------------------------");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.preventDefault();
  //   setSearchItem(event.target.value);
  // };

  // const filteredTodos = todos.filter((todo: Todo) =>
  //   todo.title.toLowerCase().includes(searchItem.toLowerCase())
  // );

  // const filteredChallenge = challenges?.filter((challenge) =>
  //   challenge.name.toLowerCase().includes(searchItem.toLowerCase())
  // );

  //   const filteredChallenge = challenges.filter((challenge: Database) =>
  //   challenge.public.Tables.ChallengeList.Row.name.toLowerCase().includes(searchItem.toLowerCase())
  // );
  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error : {error.message}</p>;
  }

  return (
    <div className="bg-white flex justify-center min-h-screen py-16">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8">검색 페이지</h1>
        <p className="text-lg mb-4"> 검색 기능추가</p>
        <form className="flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            // value={searchItem}
            // onChange={handleSearchChange}
            className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            검색
          </button>
        </form>
        <div className="flex flex-col">
          {content}
          {isFetchingNextPage ? (
            <h3>무한스크롤 로딩</h3>
          ) : (
            <h3>더이상 데이터가 없습니다</h3>
          )}
          {/* {filteredChallenge} */}
          {/* {filteredTodos.map((todo: Todo) => (
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
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
