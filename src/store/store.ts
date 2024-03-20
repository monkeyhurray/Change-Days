import { create } from "zustand";

interface Search {
  searchText: string;
  setSearchText: (text: string) => void;
  resetText: () => void;
}
const useSearchStore = create<Search>((set) => ({
  searchText: "",
  setSearchText: (text: string) => set({ searchText: text }), // 상태를 searchText로 업데이트
  resetText: () => set({ searchText: "" }),
}));

export default useSearchStore;
