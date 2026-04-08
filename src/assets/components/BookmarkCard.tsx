import type { Bookmark } from "../types/bookmarkTypes";
import imgMenuBookmark from "../images/icon-menu-bookmark.svg";
import iconVisitCount from "../images/icon-visit-count.svg";
import iconLastVisited from "../images/icon-last-visited.svg";
import iconCreated from "../images/icon-created.svg";
import { formatShortDate, getFaviconSrc } from "../../utils/helpers";

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
  const favionModules = import.meta.glob("../images/favicon-*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>;
  const faviconSrc = getFaviconSrc(bookmark.favicon, favionModules);
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl h-68">
      <div className="px-4 pt-4">
        <div className="flex justify-between py-2 border-b border-teal-500/20 ">
          {/* title , url & menu button */}
          <div className="flex gap-4">
            <img src={faviconSrc} alt="" className="w-11 rounded-lg" />
            <div>
              <p className="text-preset-2">{bookmark.title}</p>
              <p className="text-preset-5">url</p>
            </div>
          </div>
          <button className="border rounded-lg flex items-center justify-center border-teal-500/50 w-8 h-8">
            <img
              src={imgMenuBookmark}
              alt="bookmark menu button"
              className="w-5 h-5"
            />
          </button>
        </div>
        {/* description section */}
        <div className="space-y-4">
          <p>{bookmark.description}</p>
          {/* Tag section */}
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
      </div>

      {/* Stats section using visit stats from aboveto clean up code */}
      <div className="px-4 py-3 border-t border-teal-500/20 ">
        <div className="flex gap-4 ">
          {visitStats.map((stat) => {
            return (
              <div key={stat.value} className="flex gap-2">
                <div className="w-3 flex items-center">
                  <img src={stat.image} alt="" className="w-full" />
                </div>
                {/* whitespace-nowrap stops date/month wrapping to next line */}
                <p className="whitespace-nowrap text-preset-5">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
