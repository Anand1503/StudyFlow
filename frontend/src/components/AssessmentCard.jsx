function AssessmentCard({ title, subject, dueDate, status, type }) {
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <span className="badge badge-warning">Pending</span>
      case 'submitted': return <span className="badge badge-success">Submitted</span>
      case 'overdue': return <span className="badge badge-danger">Overdue</span>
      default: return null
    }
  }
  return (
    <div className="card" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{title}</h3>
      <p className="mb-2">Subject: {subject}</p>
      <p className="mb-2">Type: {type}</p>
      <p className="mb-2">Due: {dueDate}</p>
      <div className="mb-2">{getStatusBadge(status)}</div>
    </div>
  )
}
export default AssessmentCard 