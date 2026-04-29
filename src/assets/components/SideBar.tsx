import type { Bookmark } from "../types/bookmarkTypes";
import iconBM from "../images/logo-light-theme.svg";
import iconHome from "../images/icon-home.svg";
import iconArchive from "../images/icon-archive.svg";
import iconExit from "../images/icon-close.svg";
import type React from "react";

// SideBar props(read+update)
type SideBarProps = {
  bookmarks: Bookmark[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideBar({
  bookmarks,
  selectedTags,
  setSelectedTags,
  isMenuOpen,
  setIsMenuOpen,
}: SideBarProps) {
  // Remove duplicated tags..flatMap combines all arrays to create 1 big array instaed.
  const allTags = bookmarks.flatMap(
    (bookmark: Bookmark) => bookmark.tags,
  );
  //  set method is what creates a unquie array
  const uniqueTags = [...new Set(allTags)].sort((a, b) => a.localeCompare(b));

  // Handler for setting Tag change
  const handleTagChange = (tag: string, checked: boolean) => {
    setSelectedTags((prev) => {
      if (checked) {
        return prev.includes(tag) ? prev : [...prev, tag];
      }
      return prev.filter((t) => t !== tag);
    });
  };

  // Count Logic
  const countForTag = (tag: string) => {
    return bookmarks.filter((b) => b.tags.includes(tag)).length;
  };

  return (
    <section
      className={
        "bg-white px-4 min-h-screen overflow-y-auto " +
        (isMenuOpen ? "fixed inset-y-0 left-0 z-50 w-4/5 md:w-2/5" : "hidden") +
        " lg:static lg:block lg:w-auto lg:h-auto lg:overflow-visible lg:z-auto"
      }
    >
      {/* Title section */}
      <div className="flex gap-2 p-3 justify-between">
        <img src={iconBM} alt="" />
        <img
          src={iconExit}
          alt=""
          className="cursor-pointer lg:hidden"
          onClick={() => setIsMenuOpen((prevMode) => !prevMode)}
        />
      </div>
      {/* Home & Archive */}

      <div className="">
        <div className="flex gap-2  px-3 py-2">
          <img src={iconHome} alt="Bookmark manager home" />
          <p>Home</p>
        </div>
        <div className="flex gap-2  px-3 py-2">
          <img src={iconArchive} alt="Bookmark manager home" />
          <p>Archived</p>
        </div>
      </div>
      {/* All Tags */}
      <div>
        <p>Tags</p>
        {uniqueTags.map((tag) => {
          return (
            <div
              key={tag}
              className="flex justify-between px-3 py-2
            "
            >
              <div className="flex items-center gap-2">
                {" "}
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-lg"
                  checked={selectedTags.includes(tag)}
                  onChange={(e) => handleTagChange(tag, e.target.checked)}
                />
                <p className="leading-none relative bottom-px">{tag}</p>
              </div>

              <p className="px-2 bg-teal-100 rounded-full text-sm">
                {countForTag(tag)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
