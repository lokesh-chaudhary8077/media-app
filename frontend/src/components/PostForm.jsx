import React, { useState } from 'react'
import { uploadPostApi } from '../api'

export default function PostForm({ onPosted }) {
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please choose an image')
      return
    }
    setError('')
    setLoading(true)
    try {
      const post = await uploadPostApi({ file, caption })
      setFile(null)
      setCaption('')
      onPosted(post)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='card stack'>
      <input className='input' type='file' accept='image/*' onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input className='input' placeholder='Caption (optional)' value={caption} onChange={(e) => setCaption(e.target.value)} />
      {error && <div style={{ color: '#f87171' }}>{error}</div>}
      <button className='btn btn-primary' disabled={loading}>{loading ? 'Uploading...' : 'Post'}</button>
    </form>
  )
}
