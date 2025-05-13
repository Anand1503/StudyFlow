function CourseCard({ title, instructor, credits, progress }) {
  return (
    <div className="card" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>{title}</h3>
      <p className="mb-2">Instructor: {instructor}</p>
      <p className="mb-2">Credits: {credits}</p>
      <div className="mb-2">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-center mt-1">{progress}% Complete</p>
      </div>
    </div>
  )
}
export default CourseCard 