import type { Bookmark } from "../types/bookmarkTypes";
import iconFront from "../images/favicon-frontend-mentor.png";
import imgMenuBookmark from "../images/icon-menu-bookmark.svg";
import iconVisitCount from "../images/icon-visit-count.svg";
import iconLastVisited from "../images/icon-last-visited.svg";
import iconCreated from "../images/icon-created.svg";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <div className="bg-white p-4 space-y-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img src={iconFront} alt="" className="w-11" />
          <div>
            <p className="text-preset-2">{bookmark.title}</p>
            <p className="text-preset-5">{bookmark.url.}</p>
          </div>
        </div>
        <button className="border rounded-lg p-3 border-teal-500/50">
          <img src={imgMenuBookmark} alt="bookmark menu button" />
        </button>
      </div>
      <div className="space-y-4">
        <p>{bookmark.description}</p>
        <div className="flex gap-x-2 gap-y-2 flex-wrap">
          {bookmark.tags.map((tag) => (
            <p
              key={tag}
              className="text-preset-5 bg-teal-100 px-2 py-1 rounded-lg"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
      <div className="flex gap-4 border-t border-teal-500/20 py-4 -mx-4 px-4">
        <div className="flex gap-1">
          <img src={iconVisitCount} alt="visit count icon" />
          <p>{bookmark.visitCount}</p>
        </div>
        <div className="flex gap-1">
          <img src={iconLastVisited} alt="" />
          <p className="whitespace-nowrap">
            {bookmark.lastVisited
              ? new Date(bookmark.lastVisited).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              : "Never"}
          </p>
        </div>
        <div className="flex gap-1">
          <img src={iconCreated} alt="" />

          <p className="whitespace-nowrap">
            {bookmark.createdAt
              ? new Date(bookmark.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              : "Never"}
          </p>
        </div>
      </div>
    </div>
  );
}
