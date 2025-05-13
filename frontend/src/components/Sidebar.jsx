import { NavLink, useNavigate } from 'react-router-dom'

const user = {
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'Test User',
}

function Sidebar() {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/courses', label: 'Courses' },
    { path: '/attendance', label: 'Attendance' },
    { path: '/assessments', label: 'Assessments' },
    { path: '/learning-pathways', label: 'Learning Pathways' },
    { path: '/certificates', label: 'Certificates' }
  ]
  const navigate = useNavigate()
  return (
    <aside className="sidebar" style={{ fontFamily: 'Montserrat, Arial, sans-serif', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            style={({ isActive }) => ({ fontFamily: 'Poppins, sans-serif', fontWeight: isActive ? 700 : 500 })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      {/* Minimized Profile */}
      <div
        onClick={() => navigate('/profile')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 24,
          marginBottom: 8,
          padding: '0.7rem 1rem',
          borderRadius: 10,
          background: 'var(--pale-azure)',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
          transition: 'background 0.2s',
        }}
      >
        <img
          src={user.photo}
          alt={user.name}
          style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--duke-blue)' }}
        />
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: 'var(--duke-blue)', fontSize: '1rem' }}>{user.name}</span>
      </div>
    </aside>
  )
}
export default Sidebar 