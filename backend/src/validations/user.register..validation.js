import { z } from "zod";

export const userSchema = z.object({
  firstname: z.string().min(3, "Firstname must be at least 3 characters"),
  lastname: z.string().min(3, "Lastname must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
