import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import SignIn from './SignIn.jsx'
import Dashboard from './Dashboard.jsx'
import PatientHistory from './PatientHistory.jsx'
import Login from './Login.jsx'
import AuditHistory from './AuditHistory.jsx'
import VerifyOTP from './VerifyOTP.jsx'
import './index.css'

// ProtectedRoute: redirects to /login if no access token in localStorage
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Protected routes — require login */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/patient-history" element={<ProtectedRoute><PatientHistory /></ProtectedRoute>} />
        <Route path="/audit-history" element={<ProtectedRoute><AuditHistory /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
