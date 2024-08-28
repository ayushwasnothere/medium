import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogType {
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const FullBlog = ({
  authorId,
  authorName,
  title,
  content,
  publishedDate,
}: BlogType) => {
  return (
    <div className="py-6 px-2 flex flex-col gap-6">
      <Link to={`/blogs/user/${authorId}`}>
        <div className="flex gap-4 items-center">
          <div>
            <Avatar text={authorName} size="big" />
          </div>
          <div className="text-sm grid gap-0.5">
            <div className="font-semibold">{authorName}</div>
            <div className="text-gray-500">{publishedDate}</div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-6">
        <div className="font-bold text-4xl">{title}</div>
        <div className="text-gray-600">{content}</div>
      </div>
    </div>
  );
};
