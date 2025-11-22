import React, { useState } from 'react'
import { signUpApi } from '../api'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'
import logo from '../assets/logo2.png'
import logo2 from '../assets/logo1.png'
import '../auth.css'
import ThemeToggle from '../components/ThemeToggle'

export default function SignUp({ onAuth }) {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await signUpApi({ name, userName, email, password })
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
            <span>Sign Up to</span>
            <img src={logo2} alt='logo' className='auth-mini-logo' />
          </div>

          {error && <div className='auth-error'>{error}</div>}

          <form onSubmit={handleSubmit} className='auth-form'>
            <div className='input-pill'>
              <label>Enter Your Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className='input-pill'>
              <label>Enter Your UserName</label>
              <input value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className='input-pill'>
              <label>Enter Email</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='input-pill has-icon'>
              <label>Enter Password</label>
              <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type='button' className='eye' onClick={() => setShowPwd(s => !s)}>{showPwd ? <IoIosEyeOff /> : <IoIosEye />}</button>
            </div>

            <button className='btn-black' disabled={loading}>{loading ? 'Signing up…' : 'Sign Up'}</button>
          </form>

          <div className='auth-foot'>
            Already have an account? <a href='/signin'>Sign In</a>
          </div>
        </div>

        <div className='auth-right'>
          <div className='logo-card'>
            <img src={logo} alt='logo' />
          </div>
          {/* <p className='logo-caption '>Social Circle</p> */}
        </div>
      </div>
    </div>
  )
}
