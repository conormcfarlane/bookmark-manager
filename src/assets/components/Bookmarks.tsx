import bookmarkDataJson from "../data/data.json";
import type { Bookmark, BookmarkData } from "../types/bookmarkTypes";
import BookmarkCard from "./BookmarkCard";

export default function Bookmarks() {
  const bookmarkData: BookmarkData = bookmarkDataJson;
  return (
    <section className="">
      <div className="flex justify-between">
        <p className="text-preset-2">All bookmarks</p>
        <button>Sort by</button>
      </div>
      <div>
        {bookmarkData.bookmarks.map((bookmark: Bookmark) => {
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
