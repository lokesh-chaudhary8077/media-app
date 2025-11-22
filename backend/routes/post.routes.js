import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { getAllPosts, like, uploadPost, updatePost, deletePost } from "../controllers/post.controllers.js"

const postRouter = express.Router()

postRouter.post("/upload", isAuth, upload.single("media"), uploadPost)
postRouter.get("/getAll", isAuth, getAllPosts)
postRouter.get("/like/:postId", isAuth, like)
postRouter.put("/:postId", isAuth, upload.single("media"), updatePost)
postRouter.delete("/:postId", isAuth, deletePost)

// comments
import { addComment, updateComment, deleteComment } from "../controllers/post.controllers.js"
postRouter.post("/:postId/comment", isAuth, addComment)
postRouter.put("/:postId/comment/:commentId", isAuth, updateComment)
postRouter.delete("/:postId/comment/:commentId", isAuth, deleteComment)

export default postRouter
