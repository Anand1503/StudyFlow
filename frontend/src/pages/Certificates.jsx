import React, { useState } from 'react'

const initialCertificates = [
  {
    course: 'Web Development Bootcamp',
    duration: '3 weeks',
    provider: 'Coursera',
    fileName: 'webdev-certificate.pdf',
    fileUrl: '',
  },
  {
    course: 'Data Science Fundamentals',
    duration: 'Jan–Feb 2025',
    provider: 'Google',
    fileName: 'datasci-certificate.pdf',
    fileUrl: '',
  },
]

export default function Certificates() {
  const [certificates, setCertificates] = useState(initialCertificates)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ course: '', duration: '', provider: '', file: null })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInput = e => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setForm(f => ({ ...f, file: files[0] }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
    setError('')
    setSuccess('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!form.course || !form.duration || !form.provider || !form.file) {
      setError('All fields are required.')
      return
    }
    if (form.file.type !== 'application/pdf') {
      setError('Only PDF files are allowed.')
      return
    }
    setCertificates(prev => [
      ...prev,
      {
        course: form.course,
        duration: form.duration,
        provider: form.provider,
        fileName: form.file.name,
        fileUrl: URL.createObjectURL(form.file),
      },
    ])
    setForm({ course: '', duration: '', provider: '', file: null })
    setShowForm(false)
    setSuccess('Certificate uploaded successfully!')
    setTimeout(() => setSuccess(''), 2000)
  }

  return (
    <div style={{ fontFamily: 'Montserrat, Arial, sans-serif', maxWidth: 700, margin: '0 auto' }}>
      {/* Top Section – Uploaded Certificates */}
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '2rem', marginBottom: '1.5rem' }}>Certificates</h1>
      <div style={{ marginBottom: '2rem' }}>
        {certificates.length === 0 && (
          <div style={{ color: 'var(--gray)', fontSize: '1.1rem' }}>No certificates uploaded yet.</div>
        )}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {certificates.map((c, i) => (
            <div
              key={i}
              className="card"
              style={{
                borderRadius: 12,
                boxShadow: 'var(--shadow-md)',
                padding: '1.5rem',
                background: 'white',
                borderLeft: '8px solid',
                borderImage: 'linear-gradient(135deg, var(--pale-azure), var(--duke-blue)) 1',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--duke-blue)' }}>🎓 {c.course}</div>
                <div style={{ color: 'var(--gray)', fontSize: '1rem', margin: '0.2rem 0' }}>🕒 {c.duration}</div>
                <div style={{ color: 'var(--gray)', fontSize: '1rem' }}>🏢 {c.provider}</div>
                <div style={{ color: 'var(--black)', fontSize: '1rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '1.1rem' }}>📎</span>
                  <span>{c.fileName}</span>
                </div>
              </div>
              <button
                className="btn btn-secondary"
                style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: '1rem', padding: '0.5rem 1.2rem', background: 'var(--pale-azure)', color: 'var(--black)' }}
                disabled
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom Section – Upload New Certificate */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          className="btn btn-primary"
          style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: '1.1rem', padding: '0.7rem 2.2rem', background: 'var(--duke-blue)', color: 'white', marginBottom: '1.2rem' }}
          onClick={() => { setShowForm(f => !f); setError(''); setSuccess('') }}
        >
          {showForm ? 'Cancel' : 'Upload New Certificate'}
        </button>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{
              margin: '2rem auto 0 auto',
              background: 'var(--seashell)',
              borderRadius: 12,
              boxShadow: 'var(--shadow-sm)',
              padding: '2rem 1.5rem',
              maxWidth: 420,
              textAlign: 'left',
              fontFamily: 'Montserrat, Arial, sans-serif',
            }}
          >
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label htmlFor="course" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Course Name</label>
              <input
                type="text"
                id="course"
                name="course"
                className="input"
                value={form.course}
                onChange={handleInput}
                style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif' }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label htmlFor="duration" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Duration</label>
              <input
                type="text"
                id="duration"
                name="duration"
                className="input"
                value={form.duration}
                onChange={handleInput}
                style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif' }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label htmlFor="provider" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Provider</label>
              <input
                type="text"
                id="provider"
                name="provider"
                className="input"
                value={form.provider}
                onChange={handleInput}
                style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif' }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label htmlFor="file" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Certificate (PDF only)</label>
              <input
                type="file"
                id="file"
                name="file"
                className="input"
                accept="application/pdf"
                onChange={handleInput}
                style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif' }}
                required
              />
            </div>
            {error && <div style={{ color: '#f44336', marginBottom: 12 }}>{error}</div>}
            {success && <div style={{ color: 'var(--duke-blue)', marginBottom: 12 }}>{success}</div>}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: 8, fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: '1rem', padding: '0.6rem 1.5rem', background: 'var(--duke-blue)', color: 'white' }}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
} 