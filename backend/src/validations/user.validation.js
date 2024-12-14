import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerUserSchema = z.object({
  fullname: z.object({
    firstname: z.string().min(3, "Firstname must be at least 3 characters"),
    lastname: z.string().min(3, "Lastname must be at least 3 characters").optional(),
  }),
  socketId: z.string().optional(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
