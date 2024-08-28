import {
  createBlogInput,
  updateBlogInput,
  updateBlogPublished,
} from "@citxruzz/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("*", async (c, next) => {
  const token = c.req.header("authorization")?.split(" ")[1] || "";
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    //@ts-ignore
    c.set("userId", user.id);
    await next();
  } catch (err) {
    c.status(403);
    return c.json({
      error: "Unauthorized",
    });
  }
});

blogRouter.put("/me", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogPublished.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
  const authorId = c.get("userId");

  try {
    const blog = await client.blog.update({
      where: {
        id: body.id,
        authorId,
      },
      data: {
        published: body.published,
      },
    });
    return c.json({
      message: "Blog updated",
      id: blog.id,
    });
  } catch (err) {
    console.log(err);
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id, page } = c.req.query();
  const filter: any = {
    published: true,
  };
  if (id) {
    filter.authorId = id;
  }
  const blogs = await client.blog.findMany({
    where: filter,
    take: 10,
    skip: (parseInt(page) - 1) * 10 || 0,
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return c.json({ blogs });
});

blogRouter.post("/", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }

  try {
    const blog = await client.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({
      message: "Blog successfully uploaded",
      id: blog.id,
    });
  } catch (err) {
    console.log(err);
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
});

blogRouter.put("/", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
  const authorId = c.get("userId");

  try {
    const blog = await client.blog.update({
      where: {
        id: body.id,
        authorId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      message: "Blog successfully updated",
      id: blog.id,
    });
  } catch (err) {
    console.log(err);
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }
});

blogRouter.get("/:id", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = Number(c.req.param("id"));
  const blog = await client.blog.findFirst({
    where: {
      id: blogId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  if (!blog) {
    c.status(411);
    c.json({
      error: "Invalid id",
    });
  }
  return c.json({
    blog,
  });
});
