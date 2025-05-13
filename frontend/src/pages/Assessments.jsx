import React, { useState, useEffect } from 'react'
import { assessmentsAPI } from '../services/api'

export default function Assessments() {
  const [assessments, setAssessments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState({})

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user || !user.id) throw new Error('User not found')
        const response = await assessmentsAPI.getAssessments(user.id)
        setAssessments(response.assessments || [])
        if (response.assessments && response.assessments.length > 0) {
          setSelectedSubject(response.assessments[0].subject)
        }
      } catch (err) {
        setError(err.message || 'Failed to load assessments')
      } finally {
        setLoading(false)
      }
    }
    fetchAssessments()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  const subjects = [...new Set(assessments.map(a => a.subject))]
  const filtered = assessments.filter(a => a.subject === selectedSubject)

  function getStatus(assessment) {
    const now = new Date()
    const deadline = new Date(assessment.deadline)
    if (assessment.submitted) return { label: 'Submitted', color: 'badge-success' }
    if (now > deadline) return { label: 'Missed', color: 'badge-danger' }
    return { label: 'Due', color: 'badge-warning' }
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSubmit = async (assessmentId) => {
    if (!selectedFile) {
      alert('Please select a file to upload')
      return
    }
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      await assessmentsAPI.uploadAssessment(assessmentId, formData)
      setUploadStatus({ ...uploadStatus, [assessmentId]: 'success' })
      alert('File uploaded successfully!')
    } catch (err) {
      setUploadStatus({ ...uploadStatus, [assessmentId]: 'error' })
      alert('Failed to upload file')
    }
  }

  return (
    <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--duke-blue)', marginBottom: 24 }}>Assessments</h2>
      <div style={{ marginBottom: 16 }}>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: 6,
            border: '1px solid var(--pale-azure)',
            width: '100%',
            maxWidth: 300
          }}
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        {filtered.map((assessment) => {
          const status = getStatus(assessment)
          const isDisabled = status.label === 'Submitted' || status.label === 'Missed'
          return (
            <div
              key={assessment.id}
              className="card"
              style={{
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
                borderLeft: '8px solid var(--pale-azure)',
                padding: '1.5rem',
                background: 'white',
                marginBottom: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 2 }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: 'var(--duke-blue)' }}>
                  {assessment.title}
                </span>
                <span className={`badge ${status.color}`} style={{ fontSize: '0.95rem', borderRadius: 6 }}>{status.label}</span>
              </div>
              <div style={{ color: 'var(--gray)', fontSize: '1rem' }}>{assessment.description}</div>
              <div style={{ color: status.color === 'badge-danger' ? '#f44336' : 'var(--duke-blue)', fontWeight: 600, fontSize: '1rem' }}>
                Deadline: {formatDate(assessment.deadline)}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  disabled={isDisabled}
                  style={{ marginBottom: '0.5rem' }}
                />
                <button
                  onClick={() => handleSubmit(assessment.id)}
                  disabled={isDisabled}
                  style={{
                    padding: '0.5rem 1rem',
                    background: isDisabled ? 'var(--gray)' : 'var(--duke-blue)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                  }}
                >
                  Submit
                </button>
                {uploadStatus[assessment.id] === 'success' && <span style={{ color: 'green', marginLeft: '0.5rem' }}>Uploaded!</span>}
                {uploadStatus[assessment.id] === 'error' && <span style={{ color: 'red', marginLeft: '0.5rem' }}>Upload failed</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 