import { Appbar } from "../components/Appbar.tsx";
import { BlogCard } from "../components/BlogCard";
import { BlogsSkeleton } from "../components/BlogsSkeleton.tsx";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

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
          {blogs.map((blog) => {
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
                key={blog.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
