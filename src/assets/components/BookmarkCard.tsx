import type { Bookmark } from "../types/bookmarkTypes";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <div>
      <div>title</div>
      <div>middle</div>
      <div>footer</div>
    </div>
  );
}
