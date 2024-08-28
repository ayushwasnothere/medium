export const BlogsSkeleton = () => {
  return (
    <div role="status" className="max-w-xl md:max-w-3xl animate-pulse">
      <div className="flex flex-col py-8 border-b border-slate-200 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center mt-4">
              <svg
                className="w-5 h-5 me-3 text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
            </div>
            <div className="h-1 bg-gray-200 rounded-full max-w-[200px] mb-2.5"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[700px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[600px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[400px] mb-2.5"></div>
          </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
      </div>
    </div>
  );
};
