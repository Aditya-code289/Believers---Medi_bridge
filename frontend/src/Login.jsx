import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_URL || 'http://localhost:9000';
      const res = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // needed so the refreshToken cookie is set
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      // Store access token for authenticated requests
      localStorage.setItem('accessToken', data.accessToken);

      navigate('/dashboard');
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
              Register
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative flex-grow pt-24 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 -z-10">
          <img alt="High-key hospital corridor" className="w-full h-full object-cover opacity-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKfOKe5fUESSBSR9y2oRL2dl3M2rXAdC0DHyPG5uuLUBMB552Qb2vouP-sh0d5rDsTk3UknV74tZ4m8DC5k9ie0l9J4L8rQEf2pk9S8tKPfRgR-k5oE8LNJwvHLVonzpZ1g0_eOgzaiLpmUa-kct4rzA_ttPkX3AHPEXEwhW7amjVtDQJoOJi0qSXLhPA6zmrLm4rIAQvfnRCPnVapPwOsbu2DSAalQi_5Jt61tPjO4UTwEWiytk4McvBmpnwRujexbVEWrSZ21wtE" />
        </div>

        {/* Login Card Container */}
        <div className="w-full max-w-md px-6 relative z-10">
          <div className="glass-panel ambient-shadow rounded-3xl p-8 md:p-12 border border-white/20">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-on-surface font-headline mb-3">Welcome Back</h1>
              <p className="text-on-surface-variant max-w-md mx-auto">Sign in to your clinical portal.</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-sm text-red-600 dark:text-red-400 text-center font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Email-ID</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                  <input
                    id="login-email"
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
                    placeholder="john.doe@hospital.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                  <input
                    id="login-password"
                    className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-right pt-2">
                  <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
                </div>
              </div>

              {/* CTA Section */}
              <div className="pt-6 space-y-4">
                <button
                  id="login-btn"
                  type="submit"
                  disabled={loading}
                  className="block text-center w-full py-4 rounded-xl teal-gradient text-on-primary font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Login'}
                </button>
                <div className="text-center">
                  <p className="text-sm text-on-surface-variant">
                    Don't have an account?{' '}
                    <Link className="text-primary font-bold hover:underline ml-1" to="/signup">Register Now</Link>
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
            <p className="text-sm font-['Inter'] text-slate-500 dark:text-slate-400">© 2024 Medi Bridge. Clinical Excellence.</p>
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

export default Login;
