import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardType {
  id: number;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorId,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardType) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex flex-col py-8 border-b border-slate-200 gap-6">
        <div className="flex flex-col gap-4">
          <Link to={`/blogs/user/${authorId}`}>
            <div className="flex items-center gap-2 leading-loose">
              <Avatar text={authorName} size="small" />
              <div className="text-sm font-semibold">{authorName}</div>
              <div className="text-xs text-slate-500"> · {publishedDate}</div>
            </div>
          </Link>
          <div>
            <div className="text-2xl font-bold">{title}</div>
            <div className="text-sm text-gray-700 line-clamp-4 text-pretty">
              {content}
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-sm leading-loose font-semibold">{`${Math.ceil(content.length / 500)} min read`}</div>
      </div>
    </Link>
  );
};
