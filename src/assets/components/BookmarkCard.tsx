import type { Bookmark } from "../types/bookmarkTypes";
import iconFront from "../images/favicon-frontend-mentor.png";
import imgMenuBookmark from "../images/icon-menu-bookmark.svg";
import iconVisitCount from "../images/icon-visit-count.svg";
import iconLastVisited from "../images/icon-last-visited.svg";
import iconCreated from "../images/icon-created.svg";
import { formatShortDate } from "../../utils/helpers";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const shortLastVisited = bookmark.lastVisited
    ? formatShortDate(bookmark.lastVisited)
    : "Never";
  const shortCreatedAt = bookmark.createdAt
    ? formatShortDate(bookmark.createdAt)
    : "Never";
  const visitStats = [
    { image: iconVisitCount, value: bookmark.visitCount },
    { image: iconLastVisited, value: shortLastVisited },
    { image: iconCreated, value: shortCreatedAt },
  ];
  return (
    <div className="bg-white p-4 space-y-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img src={iconFront} alt="" className="w-11" />
          <div>
            <p className="text-preset-2">{bookmark.title}</p>
            <p className="text-preset-5">url</p>
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
        {visitStats.map((stat) => {
          return (
            <div key={stat.value} className="flex gap-2">
              <div className="w-3 flex items-center">
                <img src={stat.image} alt="" className="w-full" />
              </div>

              <p className="whitespace-nowrap text-preset-5">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
