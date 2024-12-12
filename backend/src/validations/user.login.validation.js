import { z } from 'zod'

export const loginUserSchema = z.object({
  email : z.string().email("Invalid email Address"),
  password : z.string().min(8 , "Password must be atleast 8 characters")
});