import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.routes.js"
import postRouter from "./routes/post.routes.js"
import userRouter from "./routes/user.routes.js"
import storyRouter from "./routes/story.routes.js"
import loopRouter from "./routes/loop.routes.js"
import messageRouter from "./routes/message.routes.js"
import path from "path"
import { fileURLToPath } from "url"
import { app, server } from "./socket.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 8000

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// Serve uploaded files
app.use("/uploads", express.static("public"))

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

server.listen(port, () => {
  connectDb()
  console.log(`server started on ${port}`)
})

