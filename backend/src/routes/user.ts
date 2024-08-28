import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@citxruzz/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }

  try {
    const user = await client.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt,
    });
  } catch (err) {
    console.log(err);
    c.status(411);
    return c.json({
      error: "Email already exists",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const client = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Invalid inputs",
    });
  }

  const user = await client.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!user) {
    c.status(411);
    return c.json({
      error: "User doesn't exists",
    });
  }
  if (user.password !== body.password) {
    c.status(411);
    return c.json({
      error: "Invalid password",
    });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

userRouter.use("/me", async (c) => {
  const token = c.req.header("authorization")?.split(" ")[1] || "";
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    //@ts-ignore
    c.set("userId", user.id);
    c.json({ auth: true });
  } catch (err) {
    c.status(403);
    return c.json({
      error: "Unauthorized",
      auth: false,
    });
  }
});
