import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useAuth } from "./useAuth";

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    id: string;
  };
}

export const useBlog = (id?: string | null) => {
  const { token } = useAuth();
  const { userId } = useAuth();
  if (id === "me") {
    id = userId;
  }
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id ? id : ""}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      });
  }, []);

  return { loading, blog };
};

export const useBlogs = (id?: string) => {
  interface Blog {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    author: {
      name: string;
      id: string;
    };
  }

  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk?${id ? `id=${id}` : ""}}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
