"use client";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabase";
import { useInView } from "react-intersection-observer";
import ChallengeCard from "@/components/searchPage/ChallengeCard";
import useSearchStore from "@/store/store";

const SearchPage = () => {
  const [searchItem, setSearchItem] = useState("");
  const { ref, inView } = useInView();
  const [searchClicked, setSearchClicked] = useState(false);
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const { searchText } = useSearchStore((state) => state);
  const resetText = useSearchStore((state) => state.resetText);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchItem]);

  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["challenges", debouncedSearchItem],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      let supabaseTableData = supabase
        .from("challenges")
        .select("*")
        .order("created_at");
      if (searchClicked === false) {
        supabaseTableData = supabaseTableData.ilike("name", `%${searchItem}%`);
      }
      if (searchText) {
        supabaseTableData = supabaseTableData.ilike("name", `%${searchText}%`);
      }
      const { data: supabaseData, error } = await supabaseTableData.range(
        (pageParam - 1) * 10,
        pageParam * 10 - 1
      );

      if (error) {
        throw new Error(error.message);
      }

      return { supabaseData, nextPage: pageParam + 1 };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  console.log("infiniteData", infiniteData);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    resetText();
  }, []);
  return (
    <div className="bg-white flex justify-center min-w-full min-h-full py-32">
      <div>
        <form className="flex items-center justify-center mb-10">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchItem}
            // value={searchText}
            onChange={handleSearchChange}
            className="px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </form>
        <div className="flex py-14 pt-20 max-h-full ">
          <div className="flex flex-wrap justify-center gap-8">
            {infiniteData?.pages[0]?.supabaseData?.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                innerRef={ref}
              />
            ))}
            {!infiniteData?.pages[0]?.supabaseData?.length && (
              <h3>검색된 데이터가 없습니다.</h3>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10  text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 bg-blue-400"
          >
            맨 위로
          </button>
        </div>
        {isFetchingNextPage && (
          <div className="flex flex-wrap text-center justify-center">
            로딩중입니다...
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
