import { z } from 'zod'

export const registerCaptainSchema = z.object({
  fullname: z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().optional(), 
  }),
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 characters long"), 
  socketId: z.string().optional(),  
  status: z.enum(['active', 'inactive']).default('inactive'),
  vehicle: z.object({
    color: z.string().min(1, "Vehicle color is required"),
    plate: z.string().min(1, "Vehicle plate number is required"),
    capacity: z.number().min(1, "Capacity must be at least 1").max(100, "Capacity must be at most 100"),  
    vehicleType: z.string().min(1, "Vehicle type is required"),
  }),
  location: z.object({
    ltd: z.number().optional(),  
    lng: z.number().optional(),  
  }).optional(),
});

export const loginCaptainSchema = z.object({
  email: z.string().email("Invalid email Address"),
  password: z.string(6, "password must be atleast 6 characters")
})
