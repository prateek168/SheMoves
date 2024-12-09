import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectDB from './config/db.js'
dotenv.config()
const app = express();

app.use(cors());

connectDB();
app.get('/', (req, res) => {
  res.send("hello")
})

export default app;