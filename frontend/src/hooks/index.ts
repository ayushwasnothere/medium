import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useAuth } from "./useAuth";

export const useBlog = (id?: string) => {
  const { userId } = useAuth();
  if (id === "me") {
    id = userId;
  }
  interface Blog {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
      id: string;
    };
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id ? id : ""}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    author: {
      name: string;
      id: string;
    };
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk?${id ? `id=${id}` : ""}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
