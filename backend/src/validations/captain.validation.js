import { z } from 'zod'

export const registerCaptainSchema = z.object({
  fullname: z.object({
    firstname: z.string().min(1, "Firstname is required"),
    lastname: z.string().optional(), // Optional as per the Mongoose schema
  }),
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 characters long"), // Adjusted to a reasonable minimum length
  socketId: z.string().optional(), // Optional field
  status: z.enum(['active', 'inactive']).default('inactive'),
  vehicle: z.object({
    color: z.string().min(1, "Vehicle color is required"),
    plate: z.string().min(1, "Vehicle plate number is required"),
    capacity: z.number().min(1, "Capacity must be at least 1").max(100, "Capacity must be at most 100"), // Assuming limits for capacity
    vehicleType: z.string().min(1, "Vehicle type is required"),
  }),
  location: z.object({
    ltd: z.number().optional(), // Optional as per the Mongoose schema
    lng: z.number().optional(), // Optional as per the Mongoose schema
  }).optional(),
});

export const loginCaptainSchema = z.object({
  email: z.string().email("Invalid email Address"),
  password: z.string(6, "password must be atleast 6 characters")
})
