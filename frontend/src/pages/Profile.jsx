import React from 'react'
import { useNavigate } from 'react-router-dom'

const user = {
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'Test User',
  roll: '12345',
  dept: 'CSE',
  year: '3rd Year',
  gpa: 8.9,
  cgpa: 8.72,
}

export default function Profile({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) onLogout()
  }
  return (
    <div style={{ maxWidth: 420, margin: '2.5rem auto', fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <div className="card" style={{ borderRadius: 16, boxShadow: 'var(--shadow-lg)', padding: '2.5rem 2rem', textAlign: 'center', background: 'white' }}>
        <img
          src={user.photo}
          alt={user.name}
          style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', marginBottom: 18, border: '3px solid var(--pale-azure)' }}
        />
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: 'var(--duke-blue)', marginBottom: 6 }}>{user.name}</h2>
        <div style={{ color: 'var(--gray)', fontSize: '1.1rem', marginBottom: 18 }}>{user.roll}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginBottom: 18 }}>
          <div><b>Department:</b> {user.dept}</div>
          <div><b>Year:</b> {user.year}</div>
          <div><b>GPA:</b> {user.gpa}</div>
          <div><b>CGPA:</b> {user.cgpa}</div>
        </div>
        <button
          className="btn btn-primary"
          style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: '1rem', padding: '0.6rem 1.5rem', background: 'var(--duke-blue)', color: 'white', marginTop: 10 }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
} 