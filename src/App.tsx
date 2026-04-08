import { useState } from "react";
import Bookmarks from "./assets/components/Bookmarks";
import Header from "./assets/components/Header";
import SideBar from "./assets/components/SideBar";
import bookmarkDataJson from "./assets/data/data.json";
import type { BookmarkData } from "./assets/types/bookmarkTypes";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const bookmarkData: BookmarkData = bookmarkDataJson;
  const filteredBookmarks =
    selectedTags.length === 0
      ? bookmarkData.bookmarks
      : bookmarkData.bookmarks.filter((bookmark) =>
          selectedTags.every((tag) => bookmark.tags.includes(tag)),
        );
  return (
    <div className="mx-auto bg-teal-100 min-h-screen">
      <Header />
      <div className="grid">
        <SideBar
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <Bookmarks
          selectedTags={selectedTags}
          filteredBookmarks={filteredBookmarks}
        />
      </div>
    </div>
  );
}

export default App;
