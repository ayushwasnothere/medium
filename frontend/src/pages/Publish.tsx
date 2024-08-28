import { useState } from "react";
import { Appbar } from "../components/Appbar2.tsx";
import { PreviewTemplate } from "../components/PreviewTemplate";
import { PublishTemplate } from "../components/PublishTemplate";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <Appbar />
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <PublishTemplate
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
        <PreviewTemplate title={title} content={content} />
      </div>
    </div>
  );
};
