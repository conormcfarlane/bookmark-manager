import { useState } from "react";
import Bookmarks from "./assets/components/Bookmarks";
import Header from "./assets/components/Header";
import SideBar from "./assets/components/SideBar";
import bookmarkDataJson from "./assets/data/data.json";
import type { BookmarkData } from "./assets/types/bookmarkTypes";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bookmarkData: BookmarkData = bookmarkDataJson;
  const filteredBookmarks =
    selectedTags.length === 0
      ? bookmarkData.bookmarks
      : bookmarkData.bookmarks.filter((bookmark) =>
          selectedTags.every((tag) => bookmark.tags.includes(tag)),
        );
  return (
    <div className="mx-auto bg-teal-100 min-h-screen">
      <div className="grid lg:grid-cols-[20%_80%]">
        <div className="">
          <SideBar
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
        <div>
          <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
