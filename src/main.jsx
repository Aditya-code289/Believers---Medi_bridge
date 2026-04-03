import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import SignIn from './SignIn.jsx'
import Dashboard from './Dashboard.jsx'
import PatientHistory from './PatientHistory.jsx'
import Login from './Login.jsx'
import AuditHistory from './AuditHistory.jsx'
import VerifyOTP from './VerifyOTP.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-history" element={<PatientHistory />} />
        <Route path="/audit-history" element={<AuditHistory />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
