<<<<<<< HEAD
export const serverUrl = ""

export async function signUpApi({ name, userName, email, password }) {
const res = await fetch(`/api/auth/signup`, {
=======
export const serverUrl = "https://media-app-vs04.onrender.com"

export async function signUpApi({ name, userName, email, password }) {
const res = await fetch(`${serverUrl}/api/auth/signup`, {
>>>>>>> origin/main
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, userName, email, password }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Signup failed') }
  return res.json()
}

export async function signInApi({ userName, password }) {
<<<<<<< HEAD
const res = await fetch(`/api/auth/signin`, {
=======
const res = await fetch(`${serverUrl}/api/auth/signin`, {
>>>>>>> origin/main
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userName, password }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Signin failed') }
  return res.json()
}

export async function signOutApi() {
<<<<<<< HEAD
await fetch(`/api/auth/signout`, { credentials: 'include' })
}

export async function getPostsApi() {
const res = await fetch(`/api/post/getAll`, { credentials: 'include' })
=======
await fetch(`${serverUrl}/api/auth/signout`, { credentials: 'include' })
}

export async function getPostsApi() {
const res = await fetch(`${serverUrl}/api/post/getAll`, { credentials: 'include' })
>>>>>>> origin/main
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Failed to fetch posts') }
  return res.json()
}

export async function uploadPostApi({ file, caption }) {
  const formData = new FormData()
  formData.append('media', file)
  if (caption) formData.append('caption', caption)
<<<<<<< HEAD
const res = await fetch(`/api/post/upload`, {
=======
const res = await fetch(`${serverUrl}/api/post/upload`, {
>>>>>>> origin/main
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Upload failed') }
  return res.json()
}

export async function likePostApi(postId) {
<<<<<<< HEAD
const res = await fetch(`/api/post/like/${postId}`, { credentials: 'include' })
=======
const res = await fetch(`${serverUrl}/api/post/like/${postId}`, { credentials: 'include' })
>>>>>>> origin/main
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Failed to like post') }
  return res.json()
}

export async function updatePostApi(postId, { file, caption }) {
  const formData = new FormData()
  if (file) formData.append('media', file)
  if (typeof caption === 'string') formData.append('caption', caption)
<<<<<<< HEAD
const res = await fetch(`/api/post/${postId}`, {
=======
const res = await fetch(`${serverUrl}/api/post/${postId}`, {
>>>>>>> origin/main
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Update failed') }
  return res.json()
}

export async function deletePostApi(postId) {
<<<<<<< HEAD
const res = await fetch(`/api/post/${postId}`, {
=======
const res = await fetch(`${serverUrl}/api/post/${postId}`, {
>>>>>>> origin/main
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Delete failed') }
  return res.json()
}

export async function addCommentApi(postId, message) {
<<<<<<< HEAD
const res = await fetch(`/api/post/${postId}/comment`, {
=======
const res = await fetch(`${serverUrl}/api/post/${postId}/comment`, {
>>>>>>> origin/main
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Add comment failed') }
  return res.json()
}

export async function updateCommentApi(postId, commentId, message) {
<<<<<<< HEAD
const res = await fetch(`/api/post/${postId}/comment/${commentId}`, {
=======
const res = await fetch(`${serverUrl}/api/post/${postId}/comment/${commentId}`, {
>>>>>>> origin/main
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ message }),
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Update comment failed') }
  return res.json()
}

export async function deleteCommentApi(postId, commentId) {
<<<<<<< HEAD
const res = await fetch(`/api/post/${postId}/comment/${commentId}`, {
=======
const res = await fetch(`${serverUrl}/api/post/${postId}/comment/${commentId}`, {
>>>>>>> origin/main
    method: 'DELETE',
    credentials: 'include',
  })
  if (!res.ok) { const text = await res.text(); let error; try { error = JSON.parse(text); } catch { error = { message: text }; } throw new Error(error.message || 'Delete comment failed') }
  return res.json()
}
