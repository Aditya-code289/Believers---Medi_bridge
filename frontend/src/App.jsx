import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* TopNavBar */}
      <nav
        className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm shadow-teal-900/5 font-sans antialiased text-slate-900 dark:text-slate-100 tracking-tight">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-teal-800 dark:text-teal-300">
            Medi Bridge
          </div>
          <div className="flex items-center gap-6">
            <Link className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors duration-200 text-sm font-medium uppercase tracking-widest active:scale-95"
              to="/login">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <main className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
        {/* Background Scene */}
        <div className="absolute inset-0 z-0">
          <img alt="Ultra high-key minimalist clinical laboratory"
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-75"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6CUjtmWR49p1pv_rXm7OXSlMJPNNOR92Aev4Tb5jqEMBCXs2zzLpiYu2jAI3zYi4jFpI5yhHTC5ZiKWsOJctGonwbLrAWALK5Yv8TkOVCsMZEgDcZ_KweW7cL_pGkwAAf0WnI209twqIqTiQDqZx-6fQdtTEh_cv1KOKnFHNcnt5rhHz3UvhTGqbZLTIg29AIcpCSUA1Jzi12ZemWl6MO7H5ZtnuPrf1wniQ95rsRR76rgda1Xp3qIY5u7OVV3jyJeaFotKT4Akan" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
        </div>
        {/* Hero Content Block */}
        <section className="relative z-10 text-center px-6 animate-float py-20">
          <div className="max-w-5xl mx-auto">
            {/* Branding */}
            <div className="mb-10 flicker-brand">
              <h1
                className="text-8xl md:text-[11rem] font-extrabold tracking-tighter text-on-surface drop-shadow-sm leading-none">
                <span className="typewriter">Medi Bridge</span>
              </h1>
            </div>
            {/* Description */}
            <p className="text-xl md:text-2xl font-medium text-on-surface-variant leading-relaxed mb-16 max-w-2xl mx-auto">
              Automating the bridge between<br />
              Clinical Notes and ICD-11.
            </p>
            {/* CTA Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link className="w-48 py-3.5 text-lg font-bold tracking-tight text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center"
                to="/signup">
                Sign Up
              </Link>
              <Link className="w-48 py-3.5 text-lg font-bold tracking-tight text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center"
                to="/login">
                Sign In
              </Link>
            </div>
          </div>
        </section>
        {/* Feature Grid (Subtle) */}
        <section className="relative z-10 mt-12 mb-32 px-6 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="glass-panel p-8 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="clinical_notes">clinical_notes</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight">AI Transcription</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Neural processing of complex medical dictations
                with 99.9% semantic accuracy.</p>
            </div>
            <div
              className="glass-panel p-8 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="category">category</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight">ICD-11 Mapping</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Instant conversion of diagnostic narratives into
                standardized global billing codes.</p>
            </div>
            <div
              className="glass-panel p-8 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary" data-icon="verified_user">verified_user</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2 tracking-tight">Audit Ready</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">Full traceability from original clinical note to
                final classification for compliance.</p>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full bg-slate-50 dark:bg-slate-950 rounded-t-3xl relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full max-w-screen-2xl mx-auto">
          <div className="mb-6 md:mb-0">
            <span className="text-lg font-bold text-teal-800 dark:text-teal-300">Medi Bridge</span>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              © 2024 Medi Bridge. Clinical Precision.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-teal-700 dark:hover:text-teal-200 transition-all opacity-80 hover:opacity-100"
              href="#">
              Privacy Policy
            </a>
            <a className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-teal-700 dark:hover:text-teal-200 transition-all opacity-80 hover:opacity-100"
              href="#">
              Terms of Service
            </a>
            <a className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-teal-700 dark:hover:text-teal-200 transition-all opacity-80 hover:opacity-100"
              href="#">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
      {/* Decorative Elements */}
      <div className="fixed top-[20%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div
        className="fixed bottom-[10%] left-[-5%] w-80 h-80 bg-secondary-fixed/10 rounded-full blur-[100px] pointer-events-none">
      </div>
    </div>
  );
}

export default App;
