import React, { useState, useEffect } from 'react'
import { dashboardAPI } from '../services/api'

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // These could be fetched from an API in the future, but are currently static
  const upcomingEvents = [
    { date: '2024-05-18', title: 'DBMS Assignment Due', type: 'Assignment', desc: 'Submit via LMS by 11:59pm.' },
    { date: '2024-05-21', title: 'Operating Systems Midterm', type: 'Exam', desc: 'Room 204, 10:00am.' },
    { date: '2024-05-23', title: 'Coding Workshop', type: 'Event', desc: 'Lab 3, 2:00pm.' },
  ];
  const announcements = [
    { date: '2024-05-10', title: 'Campus WiFi Maintenance', message: 'WiFi will be down on May 12 from 2–4pm.' },
    { date: '2024-05-09', title: 'Library Hours Extended', message: 'Library open till 10pm during exams.' },
    { date: '2024-05-08', title: 'New Cafeteria Menu', message: 'Check out the updated healthy options!' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user || !user.id) {
          throw new Error('User not found')
        }
        const response = await dashboardAPI.getDashboardData(user.id)
        setDashboardData(response)
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}>
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'var(--crimson)',
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}>
        {error}
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  const { student, current_courses, overall_attendance, upcoming_assessments } = dashboardData

  return (
    <div>
      {/* Top Section: Student Overview */}
      <div
        className="card"
        style={{
          background: 'var(--pale-azure)',
          color: 'var(--duke-blue)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--duke-blue)' }}>Welcome, {student.name}</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', fontSize: '1.1rem', color: 'var(--black)' }}>
          <span>{student.degree}</span>
          <span>|</span>
          <span>{student.branch}</span>
          <span>|</span>
          <span>{student.year}</span>
          <span style={{ marginLeft: 'auto', fontSize: '1.3rem', fontWeight: 600 }}>
            CGPA: <span style={{ fontWeight: 700 }}>{student.cgpa}</span>
          </span>
        </div>
      </div>

      {/* Main Dashboard Grid Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: '2rem',
          marginBottom: '2rem',
          alignItems: 'flex-start',
        }}
      >
        {/* Current Courses: spans two rows */}
        <div style={{ gridRow: '1 / span 2', gridColumn: '1' }}>
          {/* Current Courses Card */}
          <div
            className="card"
            style={{
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s, background 0.2s',
              background: 'white',
              cursor: 'pointer',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'var(--pale-azure)', e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={e => (e.currentTarget.style.background = 'white', e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--duke-blue)' }}>Current Courses</h2>
            <div style={{ fontSize: '1.1rem', color: 'var(--black)', fontFamily: 'Montserrat, Arial, sans-serif' }}>
              {current_courses.map(course => (
                <div key={course.id} style={{ marginBottom: '1rem' }}>
                  <div><b>{course.title}</b></div>
                  <div style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>{course.type}</div>
                  <div style={{ marginTop: '0.5rem' }}>Instructor: {course.instructor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div style={{ gridRow: '1', gridColumn: '2' }}>
          <div
            className="card"
            style={{
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s, background 0.2s',
              background: 'white',
              cursor: 'pointer',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'var(--pale-azure)', e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={e => (e.currentTarget.style.background = 'white', e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--duke-blue)' }}>Attendance</h2>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--duke-blue)', fontFamily: 'Montserrat, Arial, sans-serif' }}>{overall_attendance.toFixed(1)}%</div>
            <span className={`badge ${overall_attendance >= 75 ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
              {overall_attendance >= 75 ? 'Good' : 'Warning'}
            </span>
          </div>
        </div>

        {/* Pending Assessments */}
        <div style={{ gridRow: '1', gridColumn: '3' }}>
          <div
            className="card"
            style={{
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s, background 0.2s',
              background: 'white',
              cursor: 'pointer',
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
            onMouseOver={e => (e.currentTarget.style.background = 'var(--pale-azure)', e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={e => (e.currentTarget.style.background = 'white', e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--duke-blue)' }}>Pending Assessments</h2>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--black)', fontSize: '1rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>
              {upcoming_assessments.map((assessment) => (
                <li key={assessment.id} style={{ marginBottom: '0.5rem' }}>
                  <b>{assessment.title}</b> <span style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>({assessment.deadline})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Events / Deadlines */}
        <div style={{ gridRow: '2', gridColumn: '2' }}>
          <div className="card" style={{ borderRadius: '12px', background: 'var(--seashell)', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', color: 'var(--duke-blue)', marginBottom: '1rem' }}>Upcoming Events / Deadlines</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {upcomingEvents.map((event, i) => (
                <li key={i} style={{ marginBottom: '1.1rem', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ minWidth: 54, fontWeight: 600, color: 'var(--duke-blue)', fontFamily: 'Poppins, sans-serif' }}>{event.date}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--black)' }}>{event.title}</div>
                    <div style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>{event.type} &mdash; {event.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Latest Announcements */}
        <div style={{ gridRow: '2', gridColumn: '3' }}>
          <div className="card" style={{ borderRadius: '12px', background: 'var(--seashell)', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.15rem', color: 'var(--duke-blue)', marginBottom: '1rem' }}>Latest Announcements</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {announcements.map((a, i) => (
                <li key={i} style={{ marginBottom: '1.1rem', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ minWidth: 54, fontWeight: 600, color: 'var(--duke-blue)', fontFamily: 'Poppins, sans-serif' }}>{a.date}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--black)' }}>{a.title}</div>
                    <div style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>{a.message}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 