"use client";
import useSearchStore from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  const router = useRouter();
  const [currentSearchText, setCurrentSearchText] = useState("");
  const { setSearchText } = useSearchStore((state) => state);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!currentSearchText) return;
        setSearchText(currentSearchText);
        router.push("/search");
      }}
      className="flex"
    >
      <input
        type="text"
        className="px-5 py-3 w-80"
        placeholder="챌린지를 검색해 주세요"
        value={currentSearchText}
        onChange={(e) => {
          setCurrentSearchText(e.target.value);
        }}
      ></input>
      <button className="bg-white text-gray-500 px-3">
        <IoIosSearch size={30} color="inherit" />
      </button>
    </form>
  );
};

export default Search;
