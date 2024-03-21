"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabase";
import { useInView } from "react-intersection-observer";
import ChallengeCard from "@/components/ChallengeCard";

const SearchPage = () => {
  const [searchItem, setSearchItem] = useState("");
  const { ref, inView } = useInView();
  const [searchClicked, setSearchClicked] = useState(false);
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchItem]);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["challenges", searchClicked ? "all" : debouncedSearchItem],
      queryFn: async ({ pageParam }) => {
        let supabaseData = supabase
          .from("challenges")
          .select("*")
          .order("createdAt");
        if (!searchClicked) {
          supabaseData = supabaseData.ilike("name", `%${searchItem}%`);
        }
        const { data, error } = await supabaseData.range(
          (pageParam - 1) * 10,
          pageParam * 10 - 1
        );

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
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchClicked(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white flex justify-center min-h-full py-16">
      <div className="max-w-md text-center">
        <form
          className="flex items-center justify-center mb-8"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchItem}
            onChange={handleSearchChange}
            className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </form>
        <div className="flex flex-col">
          {data?.pages.map((page) =>
            page.data.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                innerRef={ref}
              />
            ))
          )}
          {isFetchingNextPage ? (
            <h3 ref={ref}>무한 스크롤 로딩...</h3>
          ) : (
            <h3 ref={ref} />
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
