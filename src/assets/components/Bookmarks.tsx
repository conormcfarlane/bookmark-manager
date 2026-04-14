import type { Bookmark } from "../types/bookmarkTypes";
import BookmarkCard from "./BookmarkCard";
import iconSort from "../images/icon-sort.svg";
import { useState } from "react";

type BookmarkProps = {
  selectedTags: string[];
  filteredBookmarks: Bookmark[];
};

export default function Bookmarks({ filteredBookmarks }: BookmarkProps) {
  const [activeSort, setActiveSort] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sortByObj = [
    { label: "Recently added", checked: false, value: "recentlyAdded" },
    { label: "Recently visited", checked: false, value: "recentlyVisited" },
    { label: "Most visited", checked: false, value: "mostVisited" },
  ];

  const sortedFilteredBookmarks =
    activeSort === "recentlyAdded"
      ? [...filteredBookmarks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      : activeSort === "recentlyVisited"
        ? [...filteredBookmarks].sort((a, b) => {
          const bTime = b.lastVisited
            ? new Date(b.lastVisited).getTime()
            : -Infinity;
          // had to use -Infinity to make sure if no lastVisited date existed that it would be rankable as lastVisted could be null
          const aTime = a.lastVisited
            ? new Date(a.lastVisited).getTime()
            : -Infinity;
          return bTime - aTime;
        })
        : activeSort === "mostVisited"
          ? [...filteredBookmarks].sort((a, b) => b.visitCount - a.visitCount)
          : filteredBookmarks;
  return (
    <section className="px-4 sm:px-8 space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-preset-2">All bookmarks</p>
        <button className=" relative flex items-center bg-white rounded-lg border py-2.5 px-3 gap-2 border-teal-500" onClick={() => setIsMenuOpen((prevMode) => !prevMode)}>
          <img src={iconSort} alt="sort icon" />
          <p className="text-preset-3">Sort By</p>
          <div className="absolute whitespace-nowrap right-0 top-0 translate-y-1/2 bg-white rounded-lg border border-teal-300">
            {isMenuOpen &&
              sortByObj.map((sortItem) => {
                return (
                  <div key={sortItem.value} className="flex gap-10 justify-between p-2 ">
                    <p className="text-preset-4">{sortItem.label}</p>
                    <input
                      type="checkbox"
                      checked={activeSort === sortItem.value}
                      onChange={() => setActiveSort(sortItem.value)}
                    />
                  </div>
                );
              })
            }

          </div>
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedFilteredBookmarks.map((bookmark: Bookmark) => {
          return (
            <div key={bookmark.id}>
              <BookmarkCard bookmark={bookmark} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
