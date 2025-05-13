import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'

export default function Login({ onLogin }) {
  const [rollNumber, setRollNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await authAPI.login(rollNumber, password)
      if (response.success) {
        onLogin()
        navigate('/dashboard')
      } else {
        setError(response.detail || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during login')
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--pale-azure)',
      padding: '2rem'
    }}>
      <h1 style={{ 
        fontFamily: 'Poppins, sans-serif', 
        fontSize: '2.5rem', 
        color: 'var(--duke-blue)', 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        StudyFlow
      </h1>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          fontFamily: 'Poppins, sans-serif', 
          fontSize: '1.5rem', 
          color: 'var(--duke-blue)', 
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Student Login
        </h2>

        {error && (
          <div style={{
            background: 'var(--light-red)',
            color: 'var(--crimson)',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--black)',
              fontFamily: 'Montserrat, Arial, sans-serif'
            }}>
              Roll Number
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--gray)',
                fontSize: '1rem',
                fontFamily: 'Montserrat, Arial, sans-serif'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--black)',
              fontFamily: 'Montserrat, Arial, sans-serif'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--gray)',
                fontSize: '1rem',
                fontFamily: 'Montserrat, Arial, sans-serif'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'var(--duke-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontFamily: 'Montserrat, Arial, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--navy-blue)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--duke-blue)'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
} 