import bookmarkDataJson from "../data/data.json";
import type { Bookmark, BookmarkData } from "../types/bookmarkTypes";
import iconBM from "../images/logo-light-theme.svg";
import iconHome from "../images/icon-home.svg";
import iconArchive from "../images/icon-archive.svg";

export default function SideBar() {
  // imported data
  const bookmarkData: BookmarkData = bookmarkDataJson;
  // Remove duplicated tags..flatMap combines all arrays to create 1 big array instaed.
  const allTags = bookmarkData.bookmarks.flatMap(
    (bookmark: Bookmark) => bookmark.tags,
  );
  //  set method is what creates a unquie array
  const uniqueTags = [...new Set(allTags)].sort((a, b) => a.localeCompare(b));
  console.log(uniqueTags);
  return (
    <section className="px-4">
      {/* Title section */}
      <div className="flex gap-2 p-3">
        <img src={iconBM} alt="" />
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
                <input type="checkbox" className="w-4 h-4 rounded-lg" />
                <p className="leading-none relative bottom-px">{tag}</p>
              </div>

              <p>counter</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
