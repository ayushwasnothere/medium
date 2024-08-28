import { Appbar } from "../components/Appbar2.tsx";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) return <Appbar />;

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
                publishedDate="22 Dec, 2024"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
