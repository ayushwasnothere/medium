interface PreviewType {
    title: string;
    content: string;
}

export const PreviewTemplate = ({title,content}:PreviewType) => {
  return (
    <div className="bg-white mt-16 p-10 border-l lg:overflow-y-auto">
      <div className="flex flex-col gap-6">
        <div className="font-bold text-4xl">{title ? title : "Preview"}</div>
        <div className="text-gray-600">
          {content
            ? content
            : "This is how your post will look when published."}
        </div>
      </div>
    </div>
  );
};
