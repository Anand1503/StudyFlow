import React from 'react'

const semester = 5
const attendanceData = [
  { subject: 'Operating Systems', total: 40, attended: 35 },
  { subject: 'Database Management Systems', total: 42, attended: 36 },
  { subject: 'Computer Networks', total: 38, attended: 35 },
  { subject: 'Operating Systems Lab', total: 20, attended: 18 },
  { subject: 'DBMS Lab', total: 20, attended: 19 },
  { subject: 'Professional Elective I', total: 36, attended: 34 },
]

function getStatus(percentage) {
  if (percentage > 75) return { label: 'Good', color: 'badge-success' }
  if (percentage >= 65) return { label: 'Warning', color: 'badge-warning' }
  return { label: 'Critical', color: 'badge-danger' }
}

const overall = attendanceData.reduce((acc, curr) => acc + (curr.attended / curr.total), 0) / attendanceData.length
const overallPercent = Math.round(overall * 100)
const overallStatus = getStatus(overallPercent)

export default function Attendance() {
  return (
    <div style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      {/* Top Summary Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--pale-azure), var(--duke-blue))',
          color: 'white',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem', margin: 0 }}>Overall Attendance</h1>
          <div style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: 'var(--seashell)' }}>
            Semester {semester} &nbsp;
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'Montserrat, Arial, sans-serif' }}>{overallPercent}%</span>
          <span className={`badge ${overallStatus.color}`} style={{ fontSize: '1.1rem', padding: '0.5rem 1.2rem', borderRadius: 8 }}>{overallStatus.label}</span>
        </div>
      </div>

      {/* Main Content: Attendance Table */}
      <div style={{ overflowX: 'auto', background: 'var(--seashell)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', padding: '1rem 0.5rem' }}>
        <table className="table" style={{ minWidth: 600, width: '100%', fontFamily: 'Montserrat, Arial, sans-serif', background: 'white', borderRadius: 12, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'var(--seashell)' }}>
              <th style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem' }}>Subject</th>
              <th style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem' }}>Total Periods</th>
              <th style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem' }}>Attended</th>
              <th style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem' }}>Percentage</th>
              <th style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => {
              const percent = Math.round((row.attended / row.total) * 100)
              const status = getStatus(percent)
              return (
                <tr
                  key={i}
                  style={{
                    background: percent < 65 ? 'rgba(244,67,54,0.08)' : percent < 75 ? 'rgba(255,152,0,0.08)' : 'rgba(76,175,80,0.07)',
                    transition: 'box-shadow 0.2s, background 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseOver={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
                  onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <td style={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: 'var(--duke-blue)' }}>📘 {row.subject}</td>
                  <td>{row.total}</td>
                  <td>{row.attended}</td>
                  <td style={{ fontWeight: 600 }}>{percent}%</td>
                  <td>
                    <span className={`badge ${status.color}`} style={{ fontSize: '0.95rem', borderRadius: 6 }}>{status.label}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
} 