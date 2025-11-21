export const serverUrl = "https://media-app-vs04.onrender.com"

export async function signUpApi({ name, userName, email, password }) {
const res = await fetch(`/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, userName, email, password }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Signup failed') }
  return res.json()
}

export async function signInApi({ userName, password }) {
const res = await fetch(`/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userName, password }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Signin failed') }
  return res.json()
}

export async function signOutApi() {
await fetch(`/api/auth/signout`, { credentials: 'include' })
}

export async function getPostsApi() {
const res = await fetch(`/api/post/getAll`, { credentials: 'include' })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Failed to fetch posts') }
  return res.json()
}

export async function uploadPostApi({ file, caption }) {
  const formData = new FormData()
  formData.append('media', file)
  if (caption) formData.append('caption', caption)
const res = await fetch(`/api/post/upload`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Upload failed') }
  return res.json()
}

export async function likePostApi(postId) {
const res = await fetch(`/api/post/like/${postId}`, { credentials: 'include' })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Failed to like post') }
  return res.json()
}

export async function updatePostApi(postId, { file, caption }) {
  const formData = new FormData()
  if (file) formData.append('media', file)
  if (typeof caption === 'string') formData.append('caption', caption)
const res = await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Update failed') }
  return res.json()
}

export async function deletePostApi(postId) {
const res = await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Delete failed') }
  return res.json()
}

export async function addCommentApi(postId, message) {
const res = await fetch(`/api/post/${postId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Add comment failed') }
  return res.json()
}

export async function updateCommentApi(postId, commentId, message) {
const res = await fetch(`/api/post/${postId}/comment/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Update comment failed') }
  return res.json()
}

export async function deleteCommentApi(postId, commentId) {
const res = await fetch(`/api/post/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Delete comment failed') }
  return res.json()
}
