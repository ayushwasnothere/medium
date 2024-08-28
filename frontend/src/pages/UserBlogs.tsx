import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export const UserBlogs = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, blogs } = useBlogs(id);

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
