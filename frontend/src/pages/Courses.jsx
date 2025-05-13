import React from 'react'

const semester = 5
const semesterCourses = {
  5: [
    { title: 'Operating Systems', instructor: 'Dr. A. Mehra', type: 'Theory' },
    { title: 'Database Management Systems', instructor: 'Prof. B. Singh', type: 'Lab-Oriented Theory' },
    { title: 'Computer Networks', instructor: 'Dr. C. Rao', type: 'Theory' },
    { title: 'Operating Systems Lab', instructor: 'Ms. D. Roy', type: 'Lab' },
    { title: 'DBMS Lab', instructor: 'Mr. E. Kumar', type: 'Lab' },
    { title: 'Professional Elective I', instructor: 'Prof. F. Sharma', type: 'Theory' },
  ],
  6: [
    { title: 'Compiler Design', instructor: 'Dr. G. Nair', type: 'Theory' },
    { title: 'Web Technologies', instructor: 'Prof. H. Gupta', type: 'Lab-Oriented Theory' },
    { title: 'Software Engineering', instructor: 'Dr. I. Patel', type: 'Theory' },
    { title: 'Web Technologies Lab', instructor: 'Ms. J. Das', type: 'Lab' },
    { title: 'Open Elective', instructor: 'Prof. K. Singh', type: 'Theory' },
  ],
}

const typeColors = {
  Theory: { background: 'var(--gray)', color: 'white' },
  Lab: { background: 'var(--duke-blue)', color: 'white' },
  'Lab-Oriented Theory': { background: 'var(--pale-azure)', color: 'var(--black)' },
}

export default function Courses() {
  const courses = semesterCourses[semester] || []
  return (
    <div style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem', margin: 0 }}>Courses</h1>
      </div>
      <div style={{ marginBottom: '1rem', color: 'var(--gray)', fontSize: '1rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>
        Showing courses for <b>Semester {semester}</b>
      </div>
      <div className="grid grid-3" style={{ gap: '2rem' }}>
        {courses.map((course, i) => (
          <div
            key={i}
            className="card"
            style={{
              borderRadius: '12px',
              boxShadow: 'var(--shadow-md)',
              padding: '2rem 1.5rem 1.5rem 1.5rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              background: 'white',
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseOut={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.7rem' }}>
                <span
                  style={{
                    ...typeColors[course.type],
                    borderRadius: 8,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.8rem',
                    marginRight: '0.7rem',
                    fontFamily: 'Montserrat, Arial, sans-serif',
                  }}
                >
                  {course.type === 'Theory' && '📘'}
                  {course.type === 'Lab' && '🧪'}
                  {course.type === 'Lab-Oriented Theory' && '🧪📘'}
                  {course.type}
                </span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--duke-blue)' }}>{course.title}</span>
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>
                <span style={{ fontWeight: 500 }}>Instructor:</span> {course.instructor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 