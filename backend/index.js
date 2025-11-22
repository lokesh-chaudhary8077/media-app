import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import postRouter from "./routes/post.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors({
<<<<<<< HEAD
  origin: "http://localhost:5173",
=======
  origin: "https://media-app-gray-delta.vercel.app",
>>>>>>> origin/main
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Serve uploaded files
app.use("/uploads", express.static("public"))

// Minimal routes only
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)

app.listen(port, () => {
  connectDb()
  console.log(`server started on ${port}`)
})

