import { useNavigate } from 'react-router-dom'

function Navbar({ onLogout }) {
  const handleLogout = () => {
    if (onLogout) onLogout()
  }
  return (
    <nav className="navbar" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>StudyFlow</h1>
      <button className="btn btn-secondary" onClick={handleLogout} style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Logout</button>
    </nav>
  )
}
export default Navbar 