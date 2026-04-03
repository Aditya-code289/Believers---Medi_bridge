import React from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
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
            <Link to="/" className="px-5 py-2 text-sm font-semibold text-teal-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all active:scale-95 duration-200">
              Go Back
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative flex-grow pt-24 pb-16 flex items-center justify-center overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 -z-10">
          <img alt="High-key hospital corridor" className="w-full h-full object-cover opacity-10" data-alt="blurred high-key medical office interior with soft natural lighting and sterile white surfaces creating a professional calm atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKfOKe5fUESSBSR9y2oRL2dl3M2rXAdC0DHyPG5uuLUBMB552Qb2vouP-sh0d5rDsTk3UknV74tZ4m8DC5k9ie0l9J4L8rQEf2pk9S8tKPfRgR-k5oE8LNJwvHLVonzpZ1g0_eOgzaiLpmUa-kct4rzA_ttPkX3AHPEXEwhW7amjVtDQJoOJi0qSXLhPA6zmrLm4rIAQvfnRCPnVapPwOsbu2DSAalQi_5Jt61tPjO4UTwEWiytk4McvBmpnwRujexbVEWrSZ21wtE" />
        </div>

        {/* Registration Card Container */}
        <div className="w-full max-w-2xl px-6 relative z-10">
          <div className="glass-panel ambient-shadow rounded-3xl p-8 md:p-12 border border-white/20">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-on-surface font-headline mb-3">Doctor Registration</h1>
              <p className="text-on-surface-variant max-w-md mx-auto">Join the Medi Bridge network to streamline your clinical documentation.</p>
            </div>
            {/* Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Doctor Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">person</span>
                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none" placeholder="Dr. John Doe" type="text" />
                  </div>
                </div>
                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Phone Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">call</span>
                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>
                {/* Email ID */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Email-ID</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none" placeholder="john.doe@hospital.com" type="email" />
                  </div>
                </div>
                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Gender</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">wc</span>
                    <select defaultValue="" className="w-full pl-12 pr-10 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none appearance-none">
                      <option disabled value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                  </div>
                </div>
                {/* Hospital Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Hospital Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">local_hospital</span>
                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none" placeholder="General Medical Center" type="text" />
                  </div>
                </div>

                {/* Create Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-on-surface-variant uppercase ml-1">Create Password</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none" placeholder="••••••••" type="password" />
                  </div>
                </div>

              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-3 ml-2 mt-4">
                <input className="w-4 h-4 rounded text-primary focus:ring-primary/20 border-outline-variant bg-surface-container-lowest" id="terms" type="checkbox" />
                <label className="text-xs text-on-surface-variant" htmlFor="terms">
                  I agree to the <a className="text-primary font-semibold" href="#">Terms of Service</a> and <a className="text-primary font-semibold" href="#">Privacy Policy</a>.
                </label>
              </div>

              {/* CTA Section */}
              <div className="pt-6 space-y-4">
                <Link to="/verify-otp" className="block text-center w-full py-4 rounded-xl teal-gradient text-on-primary font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200">
                  Register
                </Link>
                <div className="text-center">
                  <p className="text-sm text-on-surface-variant">
                    Already have an account?
                    <Link className="text-primary font-bold hover:underline ml-1" to="/login">Sign In</Link>
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

export default SignIn;
