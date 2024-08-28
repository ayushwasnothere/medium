import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar.tsx";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id);

  if (loading) {
    return <Appbar />;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center mx-8">
        <div className="w-full max-w-screen-sm lg:max-w-screen-md mt-20">
          <FullBlog
            title={blog.title}
            content={blog.content}
            authorName={blog?.author.name}
            authorId={blog?.author.id}
            publishedDate="20 Dec, 2024"
          />
        </div>
      </div>
    </div>
  );
};
