import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
  const navigate = useNavigate();
  const hover = "hover:text-black cursor-pointer";
  return (
    <div className="w-full fixed flex justify-center border-b border-slate-200 bg-white">
      <div className="w-full max-w-screen-2xl px-6 py-1 md:py-4 flex justify-between items-center">
        <Link to={`/blogs`}>
          <div className="leading-loose font-bold text-3xl md:text-4xl inline">
            Quill
            <div className="inline bg-gradient-to-r bg-clip-text text-transparent from-pink-500 to-orange-500">
              Weave
            </div>
          </div>
        </Link>
        <div className="hidden md:flex gap-8 font-medium text-mdonchange text-gray-600 leading-loose items-center ">
          <div
            className={hover}
            onClick={() => {
              navigate("/blogs");
            }}
          >
            Home
          </div>
          <div
            className={hover}
            onClick={() => {
              navigate("/publish");
            }}
          >
            Publish
          </div>
          <div
            className={hover}
            onClick={() => {
              const token: string | null = localStorage.getItem("token");
              const decoded: { id: string } = jwtDecode(String(token));
              const userId = decoded.id;
              navigate(`/blogs/user/${userId}`);
            }}
          >
            My Blogs
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:text-black cursor-pointer"
            onClick={() => {
              localStorage.clear();
              navigate("/signin");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
