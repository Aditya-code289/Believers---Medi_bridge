import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function VerifyOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Read email saved during registration
  const email = localStorage.getItem('pendingEmail') || '';

  useEffect(() => {
    // Auto-focus first input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp.map((d, idx) => (idx === index ? element.value : d))];
    setOtp(newOtp);

    // Focus next input
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim().slice(0, 6);
    if (!/^\d+$/.test(paste)) return;
    const newOtp = [...otp];
    paste.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }

    if (!email) {
      setError('Session expired. Please register again.');
      return;
    }

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:9000';
      const res = await fetch(`${API}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpValue, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'OTP verification failed.');
        setLoading(false);
        return;
      }

      setSuccess('Email verified successfully! Redirecting to login...');
      localStorage.removeItem('pendingEmail');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Network error. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm dark:shadow-none">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold tracking-tight text-teal-700 dark:text-teal-500 font-headline">
            Medi Bridge
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium" href="#">How it Works</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium" href="#">Resources</a>
            <a className="text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors text-sm font-medium" href="#">Support</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/signup" className="px-5 py-2 text-sm font-semibold text-teal-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all active:scale-95 duration-200">
              Go Back
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative flex-grow pt-24 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 -z-10">
          <img alt="High-key hospital corridor" className="w-full h-full object-cover opacity-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKfOKe5fUESSBSR9y2oRL2dl3M2rXAdC0DHyPG5uuLUBMB552Qb2vouP-sh0d5rDsTk3UknV74tZ4m8DC5k9ie0l9J4L8rQEf2pk9S8tKPfRgR-k5oE8LNJwvHLVonzpZ1g0_eOgzaiLpmUa-kct4rzA_ttPkX3AHPEXEwhW7amjVtDQJoOJi0qSXLhPA6zmrLm4rIAQvfnRCPnVapPwOsbu2DSAalQi_5Jt61tPjO4UTwEWiytk4McvBmpnwRujexbVEWrSZ21wtE" />
        </div>

        {/* OTP Card Container */}
        <div className="w-full max-w-lg px-6 relative z-10">
          <div className="glass-panel ambient-shadow rounded-3xl p-8 md:p-12 border border-white/20">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-teal-600 dark:text-teal-400">lock_outline</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-on-surface font-headline mb-3">Verification</h1>
              <p className="text-on-surface-variant max-w-sm mx-auto text-sm">
                Enter the 6-digit code sent to{' '}
                <span className="font-semibold text-teal-600">{email || 'your email'}</span>
              </p>
            </div>

            {/* Error / Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-sm text-red-600 dark:text-red-400 text-center font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-sm text-green-600 dark:text-green-400 text-center font-medium">
                {success}
              </div>
            )}

            {/* Form */}
            <form className="space-y-8" onSubmit={handleVerify}>
              {/* OTP Input Group */}
              <div className="flex justify-center gap-2 sm:gap-4" onPaste={handlePaste}>
                {otp.map((data, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    className="w-10 h-12 sm:w-14 sm:h-16 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-teal-500/50 transition-all outline-none text-center text-xl sm:text-2xl font-bold text-on-surface shadow-inner"
                    type="text"
                    inputMode="numeric"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-4">
                <button
                  id="verify-otp-btn"
                  type="submit"
                  disabled={loading}
                  className="block text-center w-full py-4 rounded-xl teal-gradient text-on-primary font-bold text-base shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <div className="text-center">
                  <p className="text-sm text-on-surface-variant">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      className="text-primary font-bold hover:underline"
                      onClick={() => {
                        localStorage.removeItem('pendingEmail');
                        navigate('/signup');
                      }}
                    >
                      Go back to Register
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-4 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-bold text-teal-700 dark:text-teal-500">Medi Bridge</span>
            <p className="text-sm font-['Inter'] text-slate-500 dark:text-slate-400">© 2026 Medi Bridge. Clinical Excellence.</p>
          </div>
          <div className="flex gap-6">
            <a className="text-slate-500 hover:text-teal-600 transition-colors text-sm" href="#">Privacy Policy</a>
            <a className="text-slate-500 hover:text-teal-600 transition-colors text-sm" href="#">Terms of Service</a>
            <a className="text-slate-500 hover:text-teal-600 transition-colors text-sm" href="#">Medical Compliance</a>
            <a className="text-slate-500 hover:text-teal-600 transition-colors text-sm" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default VerifyOTP;
