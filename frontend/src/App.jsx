import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Feed from './pages/Feed'
import { serverUrl } from './api'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check session
    fetch(`/api/auth/me`, { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json()
          setUser(data)
        } else {
          setUser(null)
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>

  return (
    <ThemeProvider>
      <Routes>
        <Route path='/signup' element={!user ? <SignUp onAuth={setUser} /> : <Navigate to={'/'} />} />
        <Route path='/signin' element={!user ? <SignIn onAuth={setUser} /> : <Navigate to={'/'} />} />
        <Route path='/' element={user ? <Feed user={user} onSignOut={() => setUser(null)} /> : <Navigate to={'/signin'} />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
