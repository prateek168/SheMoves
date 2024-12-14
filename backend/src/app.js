import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'
import cookieparser from "cookie-parser"
import captainRoutes from './routes/captain.routes.js'
dotenv.config()
const app = express();

app.use(cors());
app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
connectDB();
app.get('/', (req, res) => {
  res.send("hello")
})

app.use('/users', userRoutes);
app.use('/captains',captainRoutes);
export default app;