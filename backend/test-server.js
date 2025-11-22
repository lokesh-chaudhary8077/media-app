import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Server is working!" })
})

// Serve static files from React build
app.use(express.static(path.join(__dirname, "../frontend/dist")))

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

app.listen(port, () => {
    console.log(`Test server started on ${port}`)
    console.log(`Serving frontend from: ${path.join(__dirname, "../frontend/dist")}`)
})
