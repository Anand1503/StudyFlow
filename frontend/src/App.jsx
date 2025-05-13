import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Attendance from './pages/Attendance'
import Assessments from './pages/Assessments'
import LearningPathways from './pages/LearningPathways'
import Certificates from './pages/Certificates'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function Layout({ children, onLogout }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar onLogout={onLogout} />
        <main className="container">
          {children}
        </main>
      </div>
    </div>
  )
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/courses"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Courses />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/attendance"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Attendance />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/assessments"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Assessments />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/learning-pathways"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <LearningPathways />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/certificates"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Certificates />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </Router>
  )
}

export default App 