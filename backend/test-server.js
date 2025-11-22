import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())

// Test route
app.get("/test", (req, res) => {
    res.json({ message: "Server is working!" })
})

// Basic frontend serving
app.get("*", (req, res) => {
    res.json({ message: "Frontend would be served here" })
})

app.listen(port, () => {
    console.log(`Test server started on ${port}`)
})
