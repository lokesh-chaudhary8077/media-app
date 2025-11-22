import React, { useState } from 'react'
import { signInApi } from '../api'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import logo from '../assets/logo1.png'
import logo2 from '../assets/logo2.png'
import '../auth.css'
import ThemeToggle from '../components/ThemeToggle'

export default function SignIn({ onAuth }) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await signInApi({ userName, password })
      onAuth(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-screen'>
      <div className='auth-theme-toggle'>
        <ThemeToggle />
      </div>
      <div className='auth-card'>
        <div className='auth-left'>
          <div className='auth-title'>
            <span>Sign In to</span>
            <img src={logo} alt='logo' className='auth-mini-logo' />
          </div>

          {error && <div className='auth-error'>{error}</div>}

          <form onSubmit={handleSubmit} className='auth-form'>
            <div className='input-pill'>
              <label>Enter Your UserName</label>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className='input-pill has-icon'>
              <label>Enter Password</label>
              <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type='button' className='eye' onClick={() => setShowPwd(s => !s)}>{showPwd ? <IoIosEyeOff /> : <IoIosEye />}</button>
            </div>

            <div className='auth-forgot'>Forgot Password</div>

            <button className='btn-black' disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
          </form>

          <div className='auth-foot'>
            Want to create a new Account? <a href='/signup'>Sign Up</a>
          </div>
        </div>

        <div className='auth-right'>
          <div className='logo-card'>
            <img src={logo2} alt='logo' />
          </div>
          {/* <p className='logo-caption '>Social Circle</p> */}
        </div>
      </div>
    </div>
  )
}
