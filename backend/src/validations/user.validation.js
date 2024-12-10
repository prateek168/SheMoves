import { z } from zod;

const userSchema = z.object({
  firstname: z.string().min(3, 'Name must be atleast 3 characters'),
  lastname : z.string().min(3, 'lastname must be atleast 3 charcters'),
  email: z.string().email(),
  password : z.string().min(8, "Password is too short")
              .max(20 , 'Password is too long '),
  
})

export { userSchema }   