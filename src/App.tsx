import { useState } from "react";
import Bookmarks from "./assets/components/Bookmarks";
import Header from "./assets/components/Header";
import SideBar from "./assets/components/SideBar";
import bookmarkDataJson from "./assets/data/data.json";
import type { BookmarkData } from "./assets/types/bookmarkTypes";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const bookmarkData: BookmarkData = bookmarkDataJson;
  const filteredBookmarks = bookmarkData.bookmarks.filter((bookmark) => {
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => bookmark.tags.includes(tag));
    const matchesSearch = bookmark.title
      .toLowerCase()
      .includes(searchValue.toLowerCase().trim());
    return matchesTags && matchesSearch;
  });
  return (
    <div className="mx-auto bg-teal-100 min-h-screen pb-20">
      <div className="grid lg:grid-cols-[20%_80%]">
        <div className="">
          <SideBar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
        <div className="space-y-6 md:space-y-8">
          <Header
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Bookmarks
            selectedTags={selectedTags}
            filteredBookmarks={filteredBookmarks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
