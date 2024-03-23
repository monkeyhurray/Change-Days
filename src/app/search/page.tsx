"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/supabase";
import { useInView } from "react-intersection-observer";
import ChallengeCard from "@/components/searchPage/ChallengeCard";
import useSearchStore from "@/store/store";
import { ChallengeListRow } from "../page";
const SearchPage = () => {
  const [searchItem, setSearchItem] = useState("");
  const { ref, inView } = useInView();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const [debouncedSearchItem, setDebouncedSearchItem] = useState("");
  const { searchText, setSearchText } = useSearchStore((state) => state);
  const resetText = useSearchStore((state) => state.resetText);

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
    refetchOnWindowFocus: false,
  });

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
    if (inView && hasNextPage) {
      console.log("inView", inView);
      console.log("hasNextPage", hasNextPage);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    resetText();
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchItem(searchItem);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchItem]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchText && !searchItem) {
      setSearchItem(searchText); // searchText 값이 있고 searchItem이 비어있을 때만 넣어줌
    }
  }, [searchText, searchItem]);

  return (
    <div className="bg-white flex justify-center min-w-full min-h-full py-32">
      <div className="w-full fix">
        <form className="flex items-center justify-center mb-10 px-64  ">
          <input
            type="text"
            placeholder="검색어를 입력하세요 자동으로 화면에 나타납니다"
            value={searchItem}
            onChange={handleSearchChange}
            ref={searchInputRef}
            className="px-4 py-2 min-w-full mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </form>
        <div className="flex pb-14 pt-20 justify-center">
          <div className="flex flex-wrap justify-center gap-8">
            {infiniteData?.pages.map((page) => page.supabaseData)[0].length !==
            0 ? (
              infiniteData?.pages.map((page) =>
                page.supabaseData.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    innerRef={ref}
                  />
                ))
              )
            ) : (
              <h3>검색하신 데이터가 없습니다</h3>
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
