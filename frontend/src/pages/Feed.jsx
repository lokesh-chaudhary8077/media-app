import React, { useEffect, useState } from 'react'
import { getPostsApi, likePostApi, signOutApi } from '../api'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'

export default function Feed({ user, onSignOut }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = async () => {
    setError('')
    try {
      const data = await getPostsApi()
      setPosts(data)
    } catch (err) {
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const handleLike = async (id) => {
    const updated = await likePostApi(id)
    setPosts((prev) => prev.map((p) => (p._id === id ? updated : p)))
  }

  const handleSignOut = async () => {
    await signOutApi()
    onSignOut()
  }

  return (
    <div className='container grid'>
      <div className='card toolbar'>
        <h2 className='h1'>Welcome, {user?.name || user?.userName}</h2>
        <button className='btn' onClick={handleSignOut}>Sign out</button>
      </div>

      <PostForm onPosted={(post) => setPosts((prev) => [post, ...prev])} />

      {loading ? (
        <div className='muted'>Loading posts...</div>
      ) : error ? (
        <div style={{ color: '#f87171' }}>{error}</div>
      ) : posts.length === 0 ? (
        <div className='muted'>No posts yet. Be the first!</div>
      ) : (
        <div className='grid'>
          {posts.map((p) => (
            <PostCard
              key={p._id}
              post={p}
              currentUserId={user?._id}
              onLike={() => handleLike(p._id)}
              onUpdated={(updated) => setPosts((prev) => prev.map(x => x._id === updated._id ? updated : x))}
              onDeleted={() => setPosts((prev) => prev.filter(x => x._id !== p._id))}
            />
          ))}
        </div>
      )}
    </div>
  )
}
