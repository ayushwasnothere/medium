import z from "zod";

export const signupInput = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(128),
  name: z.string().trim().min(1).max(70),
});

export const signinInput = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export const createBlogInput = z.object({
  title: z.string().trim().min(1).max(60),
  content: z.string().trim().min(1),
});

export const updateBlogInput = z.object({
  title: z.string().trim().min(1).max(60),
  content: z.string().trim().min(1),
  id: z.number(),
});

export const updateBlogPublished = z.object({
  published: z.boolean(),
  id: z.number(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type UpdateBlogPublished = z.infer<typeof updateBlogPublished>;
