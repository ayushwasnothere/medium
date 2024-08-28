import axios from "axios";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { TextArea } from "./TextArea";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ErrorBox } from "./ErrorBox";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface PublishType {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const PublishTemplate = ({
  title,
  setTitle,
  content,
  setContent,
}: PublishType) => {
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState({
    err: false,
    message: "",
  });
  const { token } = useAuth();
  return (
    <div className="-slate-100 p-10 mt-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex font-bold text-3xl md:text-4xl lg:text-5xl">
            Publish a New Blog
          </div>
          <div className="flex text-gray-500 text-sm md:text-md">
            Fill out the form to create a new blog post.
          </div>
        </div>
        <ErrorBox
          errObject={{ err: displayError.err, message: displayError.message }}
        />
        <InputBox
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label="Title"
          placeholder="Enter a title for your blog post"
        />
        <TextArea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          label="Content"
          placeholder="Write the content of your blog post"
        />
        <div className="py-4 flex self-end w-40">
          <Button
            label="Publish Post"
            onClick={async () => {
              try {
                const res = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  { title, content },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                if (res.data.id) {
                  navigate(`/blog/${res.data.id}`);
                }
              } catch (err: any) {
                if (err.response.data.error) {
                  setDisplayError({
                    err: true,
                    message: err.response.data.error,
                  });
                } else {
                  setDisplayError({
                    err: true,
                    message: "Internal error. Please try again later",
                  });
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
