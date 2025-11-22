import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import postRouter from "./routes/post.routes.js"
import userRouter from "./routes/user.routes.js"
import storyRouter from "./routes/story.routes.js"
import loopRouter from "./routes/loop.routes.js"
import messageRouter from "./routes/message.routes.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 8000

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Serve uploaded files
app.use("/uploads", express.static("public"))

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" })
})

// API routes
app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/user", userRouter)
app.use("/api/story", storyRouter)
app.use("/api/loop", loopRouter)
app.use("/api/message", messageRouter)

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../frontend/dist")))

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).json({ message: 'Internal server error', error: err.message })
})

app.listen(port, () => {
  connectDb()
  console.log(`✅ Full server started on port ${port}`)
  console.log(`📁 Serving frontend from: ${path.join(__dirname, "../frontend/dist")}`)
  console.log(`📁 Serving uploads from: ${path.join(__dirname, "public")}`)
  console.log(`🌐 Available routes:`)
  console.log(`   - POST /api/auth/signup`)
  console.log(`   - POST /api/auth/signin`)
  console.log(`   - GET  /api/auth/me`)
  console.log(`   - POST /api/post/upload`)
  console.log(`   - GET  /api/post/getAll`)
  console.log(`   - GET  /api/user/current`)
  console.log(`   - And more...`)
})

