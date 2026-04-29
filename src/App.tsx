import { useState, useEffect } from "react";
import Bookmarks from "./assets/components/Bookmarks";
import Header from "./assets/components/Header";
import SideBar from "./assets/components/SideBar";
import type { Bookmark } from "./assets/types/bookmarkTypes";
import { supabase } from "./lib/supabaseClient";
import BookmarkForm from "./assets/components/BookmarkForm";

type BookmarkFormValues = {
  title: string;
  url: string;
  description: string;
  tags: string[];
}
function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const handleAddBookmark = async (values: BookmarkFormValues) => {
    console.log("handleAddBookmark values:", values);
    setIsSaving(true);
    setSaveError(null);

    const payload = {
      title: values.title,
      url: values.url,
      description: values.description,
      tags: values.tags,
      pinned: false,
      visitCount: 0,
      lastVisited: null,
      favicon: "",
    }

    const { data, error } = await supabase.from("bookmarks").insert(payload).select().single();
    if (error) {
      console.log("Supabase insert error:", error);
      setSaveError(error.message);
      setIsSaving(false);
      return;
    }

    console.log("Supabase insert success:", data);
    setBookmarks((prev) => [data as Bookmark, ...prev]);
    setIsSaving(false);
    setIsAddOpen(false);
  }
  return (
    <div className="mx-auto bg-teal-100 min-h-screen pb-20">
      <div className="grid lg:grid-cols-[20%_80%]">
        <div className="">
          <SideBar
            bookmarks={bookmarks}
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
            onOpenAdd={() => setIsAddOpen(true)}
          />
          <Bookmarks
            selectedTags={selectedTags}
            filteredBookmarks={filteredBookmarks}
            onDelete={handleDelete}
          />
        </div>
        {isAddOpen && (
          <BookmarkForm onSubmit={handleAddBookmark}
            isLoading={isSaving}
            error={saveError}
            onCancel={() => setIsAddOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
