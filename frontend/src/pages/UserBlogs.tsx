import { Link, useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar.tsx";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { Button } from "../components/Button";
import { BlogsSkeleton } from "../components/BlogsSkeleton.tsx";

export const UserBlogs = () => {
  const { id } = useParams();
  const { loading, blogs } = useBlogs(id);

  if (loading)
    return (
      <div>
        <Appbar />
        <div className="flex items-center justify-center mx-8">
          <div className="w-full max-w-xl lg:max-w-3xl mt-16">
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
            <BlogsSkeleton />
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <Appbar />
      <div className="flex justify-center mx-8">
        <div className="w-full max-w-xl lg:max-w-3xl mt-16">
          {blogs.length > 0 ? (
            blogs.map((blog) => {
              return (
                <BlogCard
                  id={blog.id}
                  authorId={blog.author.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(blog.createdAt))}
                />
              );
            })
          ) : (
            <div className="flex flex-col gap-6 mt-20 justify-center items-center">
              <div className="font-bold text-4xl lg:text-6xl text-center">
                You don't have any blogs yet
              </div>
              <div className="text-gray-600">
                Click the below button to goto publish page
              </div>
              <Link className="w-2/4" to="/publish">
                <Button label="Publish" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
