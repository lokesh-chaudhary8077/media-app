import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import fs from "fs/promises";
import path from "path";

function localPathFromMedia(media) {
  // media like "/uploads/filename.ext" -> backend/public/filename.ext
  if (!media || !media.startsWith("/uploads/")) return null
  const fileName = media.replace("/uploads/", "")
  return path.join(process.cwd(), "public", fileName)
}

export const uploadPost = async (req, res) => {
  try {
    const { caption } = req.body
    if (!req.file) {
      return res.status(400).json({ message: "media is required" })
    }

    // Store local path served from /uploads
    const media = `/uploads/${req.file.filename}`
    const mediaType = "image"

    const post = await Post.create({ caption, media, mediaType, author: req.userId })

    // Keep user's posts list updated (optional)
    const user = await User.findById(req.userId)
    if (user) {
      user.posts.push(post._id)
      await user.save()
    }

    const populatedPost = await Post.findById(post._id).populate("author", "name userName profileImage")
    return res.status(201).json(populatedPost)
  } catch (error) {
    return res.status(500).json({ message: `uploadPost error ${error}` })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name userName profileImage")
      .populate("comments.author", "name userName profileImage")
      .sort({ createdAt: -1 })
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ message: `getallpost error ${error}` })
  }
}

export const like = async (req, res) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(400).json({ message: "post not found" })
    }

    const userIdStr = req.userId.toString()
    const alreadyLiked = post.likes.some((id) => id.toString() === userIdStr)

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userIdStr)
    } else {
      post.likes.push(req.userId)
    }

    await post.save()
    await post.populate("author", "name userName profileImage")
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `likepost error ${error}` })
  }
}

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.postId
    const { caption } = req.body
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "post not found" })
    if (post.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "not allowed" })
    }

    // Update caption
    if (typeof caption === 'string') post.caption = caption

    // If new file uploaded, replace media and remove previous local file
    if (req.file) {
      const oldLocal = localPathFromMedia(post.media)
      post.media = `/uploads/${req.file.filename}`
      if (oldLocal) {
        try { await fs.unlink(oldLocal) } catch {}
      }
    }

    await post.save()
    await post.populate("author", "name userName profileImage")
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `updatePost error ${error}` })
  }
}

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "post not found" })
    if (post.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "not allowed" })
    }

    const local = localPathFromMedia(post.media)

    await Post.deleteOne({ _id: postId })

    // Remove from user's posts array
    await User.updateOne({ _id: req.userId }, { $pull: { posts: postId } })

    if (local) {
      try { await fs.unlink(local) } catch {}
    }

    return res.status(200).json({ message: "deleted" })
  } catch (error) {
    return res.status(500).json({ message: `deletePost error ${error}` })
  }
}

export const addComment = async (req, res) => {
  try {
    const postId = req.params.postId
    const { message } = req.body
    if (!message || !message.trim()) return res.status(400).json({ message: "message required" })
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "post not found" })

    post.comments.push({ author: req.userId, message })
    await post.save()
    await post.populate("author", "name userName profileImage")
    await post.populate("comments.author", "name userName profileImage")
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `addComment error ${error}` })
  }
}

export const updateComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params
    const { message } = req.body
    if (!message || !message.trim()) return res.status(400).json({ message: "message required" })

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "post not found" })

    const comment = post.comments.id(commentId)
    if (!comment) return res.status(404).json({ message: "comment not found" })
    if (comment.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "not allowed" })
    }

    comment.message = message
    await post.save()
    await post.populate("author", "name userName profileImage")
    await post.populate("comments.author", "name userName profileImage")
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `updateComment error ${error}` })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "post not found" })

    const comment = post.comments.id(commentId)
    if (!comment) return res.status(404).json({ message: "comment not found" })
    if (comment.author.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "not allowed" })
    }

    comment.deleteOne()
    await post.save()
    await post.populate("author", "name userName profileImage")
    await post.populate("comments.author", "name userName profileImage")
    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ message: `deleteComment error ${error}` })
  }
}
