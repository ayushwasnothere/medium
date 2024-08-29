import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar.tsx";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton.tsx";
import { useMemo } from "react";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id);
  const formattedDate = useMemo(() => {
    if (!blog?.createdAt) {
      return "Date not available"; // Provide a fallback value
    }

    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(blog.createdAt));
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date"; // Fallback in case of error
    }
  }, [blog?.createdAt]);

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center mx-8">
          <div className="w-full max-w-screen-sm lg:max-w-screen-md mt-20">
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center mx-8">
        <div className="w-full max-w-screen-sm lg:max-w-screen-md mt-20">
          <FullBlog
            title={String(blog?.title)}
            content={String(blog?.content)}
            authorName={String(blog?.author.name)}
            authorId={String(blog?.author.id)}
            publishedDate={formattedDate}
          />
        </div>
      </div>
    </div>
  );
};
