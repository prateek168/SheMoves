import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectDB from './config/db.js'
import uesrRoutes from './routes/user.routes.js'
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

connectDB();
app.get('/', (req, res) => {
  res.send("hello")
})

app.use('/users', uesrRoutes);

export default app;