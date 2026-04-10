import type { Bookmark } from "../types/bookmarkTypes";
import BookmarkCard from "./BookmarkCard";

type BookmarkProps = {
  selectedTags: string[];
  filteredBookmarks: Bookmark[];
};

export default function Bookmarks({ filteredBookmarks }: BookmarkProps) {
  return (
    <section className="px-4 sm:px-8">
      <div className="flex justify-between">
        <p className="text-preset-2">All bookmarks</p>
        <button>Sort by</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookmarks.map((bookmark: Bookmark) => {
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
