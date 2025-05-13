import React from 'react'

const semester = 5
const learningPathwayData = [
  {
    title: 'Database Management Systems',
    instructor: 'Prof. B. Singh',
    type: 'Lab-Oriented Theory',
    progress: 60,
    status: 'Needs Attention',
    statusIcon: '⚠️',
    nextAction: 'Complete Lab 2 – Transactions',
  },
  {
    title: 'Operating Systems',
    instructor: 'Dr. A. Mehra',
    type: 'Theory',
    progress: 80,
    status: 'On Track',
    statusIcon: '✅',
    nextAction: 'Revise Memory Management',
  },
  {
    title: 'Computer Networks',
    instructor: 'Dr. C. Rao',
    type: 'Theory',
    progress: 55,
    status: 'Needs Attention',
    statusIcon: '⚠️',
    nextAction: 'Watch Lecture 5 – Routing',
  },
  {
    title: 'Operating Systems Lab',
    instructor: 'Ms. D. Roy',
    type: 'Lab',
    progress: 90,
    status: 'On Track',
    statusIcon: '✅',
    nextAction: 'Submit Lab 4 – Scheduling',
  },
  {
    title: 'DBMS Lab',
    instructor: 'Mr. E. Kumar',
    type: 'Lab',
    progress: 75,
    status: 'On Track',
    statusIcon: '✅',
    nextAction: 'Prepare for Practical Exam',
  },
  {
    title: 'Professional Elective I',
    instructor: 'Prof. F. Sharma',
    type: 'Theory',
    progress: 68,
    status: 'Needs Attention',
    statusIcon: '⚠️',
    nextAction: 'Read Chapter 6 – Advanced Topics',
  },
]

const typeColors = {
  Theory: { background: 'var(--gray)', color: 'white' },
  Lab: { background: 'var(--duke-blue)', color: 'white' },
  'Lab-Oriented Theory': { background: 'var(--pale-azure)', color: 'var(--black)' },
}
const statusColors = {
  'On Track': { color: 'var(--duke-blue)' },
  'Needs Attention': { color: '#ff9800' },
}

export default function LearningPathways() {
  return (
    <div style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem', margin: 0 }}>Learning Pathways – Semester {semester}</h1>
        <div style={{ color: 'var(--gray)', fontSize: '1.1rem', marginTop: '0.3rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>
          Track your subject progress and stay ahead.
        </div>
      </div>
      {/* Course Progress Cards */}
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {learningPathwayData.map((course, i) => (
          <div
            key={i}
            className="card"
            style={{
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              padding: 0,
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 220,
            }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            {/* Gradient Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--pale-azure), var(--duke-blue))',
              color: 'white',
              padding: '1.2rem 1.5rem 1rem 1.5rem',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem' }}>{course.title}</span>
              <span style={{
                ...typeColors[course.type],
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '0.25rem 0.8rem',
                marginLeft: '0.7rem',
                fontFamily: 'Montserrat, Arial, sans-serif',
              }}>
                {course.type === 'Theory' && '📘'}
                {course.type === 'Lab' && '🧪'}
                {course.type === 'Lab-Oriented Theory' && '🧪📘'}
                {course.type}
              </span>
            </div>
            {/* Card Body */}
            <div style={{ padding: '1.2rem 1.5rem 1.2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ marginBottom: '0.7rem' }}>
                <div style={{ color: 'var(--gray)', fontSize: '1rem', marginBottom: '0.3rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>
                  <span style={{ fontWeight: 500 }}>Instructor:</span> {course.instructor}
                </div>
                {/* Progress Bar */}
                <div style={{ margin: '0.7rem 0 0.5rem 0' }}>
                  <div className="progress-bar" style={{ background: 'var(--seashell)', borderRadius: 6, height: 10 }}>
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${course.progress}%`,
                        background: 'var(--duke-blue)',
                        borderRadius: 6,
                        height: 10,
                        transition: 'width 0.3s',
                      }}
                    />
                  </div>
                  <div style={{ fontSize: '0.95rem', color: 'var(--black)', marginTop: 2, fontFamily: 'Montserrat, Arial, sans-serif' }}>{course.progress}% Complete</div>
                </div>
                {/* Status and Next Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.5rem 0' }}>
                  <span style={{ fontWeight: 600, ...statusColors[course.status], fontFamily: 'Montserrat, Arial, sans-serif' }}>{course.statusIcon} {course.status}</span>
                  <span style={{ color: 'var(--gray)', fontSize: '0.95rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>{course.nextAction}</span>
                </div>
              </div>
              <button
                style={{
                  marginTop: 'auto',
                  alignSelf: 'flex-end',
                  background: 'var(--pale-azure)',
                  color: 'var(--black)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1.2rem',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'background 0.2s',
                }}
                disabled
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 