"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabase";
import { useInView } from "react-intersection-observer";
import ChallengeCard from "@/components/ChallengeCard";

const SearchPage = () => {
  const [searchItem, setSearchItem] = useState("");
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["challenges", searchQuery],
    queryFn: async ({ pageParam }) => {
      const { data, error } = await supabase
        .from("challenges")
        .select("*")
        .order("createdAt")
        .range((pageParam - 1) * 10, pageParam * 10 - 1)
        .like("name", `%${searchItem}%`); // 추가: 검색어로 필터링
      if (error) {
        throw new Error(error.message);
      }

      return { data, nextPage: pageParam + 1 };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("inView", inView);
      console.log("hasNextPage", hasNextPage);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const filteredChallenge = data?.pages
    .flatMap((page) => page.data)
    .filter((challenge) =>
      challenge.name.toLowerCase().includes(searchItem.toLowerCase())
    );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
    // refetch();
  };
  const handleSearchSubmit = () => {
    setSearchQuery(searchItem); // 검색어 입력이 완료되면 검색어 상태 업데이트
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="bg-white flex justify-center min-h-full py-16">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-8">검색 페이지</h1>
        <p className="text-lg mb-4">검색 기능 추가</p>
        <form
          className="flex items-center justify-center mb-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit();
          }}
        >
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
        <div className="flex flex-col">
          {filteredChallenge?.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              innerRef={ref}
            />
          ))}
          {isFetchingNextPage ? (
            <h3 ref={ref}>무한 스크롤 로딩...</h3>
          ) : (
            <h3 ref={ref}> 데이터가 없습니다</h3>
          )}
        </div>
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          맨 위로
        </button>
      </div>
    </div>
  );
};

export default SearchPage;
