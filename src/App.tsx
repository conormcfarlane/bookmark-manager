import { useState, useEffect } from "react";
import Bookmarks from "./assets/components/Bookmarks";
import Header from "./assets/components/Header";
import SideBar from "./assets/components/SideBar";
import type { Bookmark } from "./assets/types/bookmarkTypes";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id);
    if (error) { console.log(error); return; }
    setBookmarks((prev) => prev.filter((a) => a.id != id))
  }


  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data, error } = await supabase.from('bookmarks').select('*');
      console.log(data)

      if (error) {
        console.log(error);
        return;
      }
      setBookmarks(data as Bookmark[]);
    };
    fetchBookmarks();

  }, [])

  const filteredBookmarks: Bookmark[] = bookmarks.filter((bookmark) => {
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
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
