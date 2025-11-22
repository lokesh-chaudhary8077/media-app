import React, { useState } from 'react'
import { serverUrl, updatePostApi, deletePostApi, addCommentApi, updateCommentApi, deleteCommentApi } from '../api'

export default function PostCard({ post, onLike, currentUserId, onUpdated, onDeleted }) {
  const [editing, setEditing] = useState(false)
  const [caption, setCaption] = useState(post.caption || '')
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const likeCount = post.likes?.length || 0
  const imgSrc = post.media?.startsWith('/uploads') ? post.media : post.media

  const isOwner = currentUserId && post?.author?._id === currentUserId
  const likedByMe = !!post.likes?.find?.(id => String(id) === String(currentUserId))

  // comments state
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const updated = await updatePostApi(post._id, { file, caption })
      onUpdated?.(updated)
      setEditing(false)
      setFile(null)
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return
    setBusy(true)
    try {
      await deletePostApi(post._id)
      onDeleted?.()
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className='card'>
      {!editing ? (
        <>
          {imgSrc && (
            <img className='post-img' src={imgSrc} alt={caption} />
          )}
          <div className='toolbar' style={{ marginTop: 8 }}>
            <div>
              <strong>{post?.author?.userName || 'user'}</strong>
              {caption && <div className='muted'>{caption}</div>}
            </div>
            <div className='stack' style={{ gridAutoFlow: 'column', gap: 8 }}>
              <button className='btn' onClick={onLike}>{likedByMe ? '❤️' : '🤍'} {likeCount}</button>
              {isOwner && (
                <>
                  <button className='btn' onClick={() => setEditing(true)}>Edit</button>
                  <button className='btn' onClick={handleDelete} disabled={busy}>Delete</button>
                </>
              )}
            </div>
          </div>
          {/* comments list */}
          <div className='stack' style={{ marginTop: 12 }}>
            {post.comments?.length > 0 ? (
              post.comments.map((c) => (
                <div key={c._id} className='toolbar card' style={{ padding: 12 }}>
                  <div>
                    <strong>{c.author?.userName || 'user'}</strong>
                    {editingCommentId === c._id ? (
                      <input className='input' style={{ marginTop: 8 }} value={editingCommentText} onChange={(e) => setEditingCommentText(e.target.value)} />
                    ) : (
                      <div className='muted'>{c.message}</div>
                    )}
                  </div>
                  {String(c.author?._id) === String(currentUserId) && (
                    <div className='stack' style={{ gridAutoFlow: 'column', gap: 8 }}>
                      {editingCommentId === c._id ? (
                        <>
                          <button className='btn' onClick={async () => {
                            try {
                              const updated = await updateCommentApi(post._id, c._id, editingCommentText)
                              onUpdated?.(updated)
                              setEditingCommentId(null)
                              setEditingCommentText('')
                            } catch (err) { alert(err.message) }
                          }}>Save</button>
                          <button className='btn' onClick={() => { setEditingCommentId(null); setEditingCommentText('') }}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className='btn' onClick={() => { setEditingCommentId(c._id); setEditingCommentText(c.message) }}>Edit</button>
                          <button className='btn' onClick={async () => { try { const updated = await deleteCommentApi(post._id, c._id); onUpdated?.(updated) } catch (err) { alert(err.message) } }}>Delete</button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='muted'>No comments yet.</div>
            )}
            {/* add comment */}
            <form className='toolbar' onSubmit={async (e) => {
              e.preventDefault()
              if (!newComment.trim()) return
              try {
                const updated = await addCommentApi(post._id, newComment)
                onUpdated?.(updated)
                setNewComment('')
              } catch (err) { alert(err.message) }
            }}>
              <input className='input' placeholder='Write a comment…' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
              <button className='btn btn-primary' type='submit'>Comment</button>
            </form>
          </div>
        </>
      ) : (
        <form className='stack' onSubmit={handleUpdate}>
          <input className='input' placeholder='Caption' value={caption} onChange={(e) => setCaption(e.target.value)} />
          <input className='input' type='file' accept='image/*' onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <div className='toolbar'>
            <div className='muted'>Replace image (optional)</div>
            <div className='stack' style={{ gridAutoFlow: 'column', gap: 8 }}>
              <button className='btn' type='button' onClick={() => { setEditing(false); setFile(null); setCaption(post.caption || '') }}>Cancel</button>
              <button className='btn btn-primary' disabled={busy}>{busy ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
