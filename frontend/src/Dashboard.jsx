import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="bg-background text-on-background antialiased flex min-h-screen">
      {/* Sidebar Navigation (SideNavBar Rail) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-50 dark:bg-slate-900 flex flex-col p-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-xl font-bold tracking-tighter text-teal-700 dark:text-teal-300">Medi Bridge</h1>
          <p className="text-xs text-on-surface-variant/70 font-medium uppercase tracking-widest mt-1">Clinical Portal</p>
        </div>
        <nav className="flex-1 space-y-2">
          {/* Active Tab: Dashboard */}
          <Link className="flex items-center gap-3 px-4 py-3 text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-800 rounded-xl shadow-sm scale-[0.98] transition-transform" to="/dashboard">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span className="font-semibold">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-colors duration-200" to="/audit-history">
            <span className="material-symbols-outlined" data-icon="fact_check" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            <span className="font-medium">Audit History</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-colors duration-200" to="/patient-history">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            <span className="font-medium">Patient History</span>
          </Link>
        </nav>
        <div className="mt-auto p-4 bg-surface-container-low rounded-2xl flex items-center gap-3">
          <img alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover bg-white" data-alt="professional portrait of a medical doctor in a white coat with a friendly expression in a bright clinic setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1VPLNGCGCwgOLkJhYW7EOy-yGkD0abdvSWP_aRYmrAj1nALsVdhDPH5gkSWrdS5zmdwvVynpeP0ce3VLkDm_nnfBuJvxUUA0NiztfhXVvR8DqxtYyDYqCKvbemNDFA4I0QWijvANPa0plONn5e-_t4xkjyOJRbxBoEQay9HK45iLLS5EmfMUrJmlokM0gq9k7KOF0rIdJd-Tp-D1rsIxIEShxLGcWAndzHK-P8fgbcoawTfMcNuzxgoBqcfzpKbSkqQhj89ICtAyV" />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">Dr. Julian Vance</p>
            <p className="text-xs text-on-surface-variant">General Physician</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center px-8 h-16 sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-none">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
            <input className="w-full bg-surface-container-lowest border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-teal-500/20 transition-all" placeholder="Search patients or records..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-teal-700 transition-all">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-teal-700 transition-all">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <div className="h-6 w-px bg-outline-variant/30"></div>
            <button className="flex items-center gap-2 pl-2">
              <span className="material-symbols-outlined text-teal-600" data-icon="account_circle">account_circle</span>
            </button>
          </div>
        </header>

        <section className="p-8 space-y-8">
          {/* Welcome Card */}
          <div className="clinical-gradient rounded-[2rem] p-8 text-on-primary relative overflow-hidden flex items-center justify-between ambient-shadow">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome, Dr. Vance!</h2>
              <p className="text-on-primary/80 font-medium max-w-md">Your clinical summary is ready. You have 3 urgent notifications and 5 messages waiting for review.</p>
              <div className="flex gap-4 mt-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="mail">mail</span> 5 Messages
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="error">error</span> 3 Urgent
                </span>
              </div>
            </div>
            <div className="relative z-10 hidden lg:block">
              <span className="material-symbols-outlined text-[120px] opacity-20" data-icon="medical_services">medical_services</span>
            </div>
            {/* Abstract Texture Background */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/10 rounded-full blur-2xl"></div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* New Patients */}
            <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] ambient-shadow flex items-center gap-5 border border-white/50">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl" data-icon="person_add">person_add</span>
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface-variant tracking-wide">New Patients</p>
                <h3 className="text-3xl font-bold text-on-surface">16</h3>
                <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tighter">+12% from last month</p>
              </div>
            </div>
            {/* All Patients */}
            <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] ambient-shadow flex items-center gap-5 border border-white/50">
              <div className="w-14 h-14 bg-secondary-container/30 rounded-2xl flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-3xl" data-icon="groups">groups</span>
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface-variant tracking-wide">All Patients</p>
                <h3 className="text-3xl font-bold text-on-surface">58</h3>
                <p className="text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-tighter">Registered in Portal</p>
              </div>
            </div>
            {/* Gender Distribution */}
            <div className="bg-surface-container-lowest p-6 rounded-[1.5rem] ambient-shadow flex flex-col justify-center border border-white/50">
              <p className="text-sm font-medium text-on-surface-variant mb-3 tracking-wide">Gender Distribution</p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-primary">Male: 26</span>
                    <span className="text-tertiary">Female: 44</span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container-low rounded-full flex overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '37%' }}></div>
                    <div className="h-full bg-tertiary-container" style={{ width: '63%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Agenda (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold text-on-surface tracking-tight">Agenda for Today</h3>
                <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View Full Calendar</button>
              </div>
              <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden ambient-shadow border border-white/50">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Patient Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Phone</th>
                      <th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {/* Rows */}
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5 font-bold text-primary text-sm">09:00 AM</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">PS</div>
                          <span className="text-sm font-semibold text-on-surface">Priya Sharma</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">+1 (555) 012-9844</td>
                      <td className="px-6 py-5 text-sm font-medium">Routine Checkup</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5 font-bold text-primary text-sm">10:30 AM</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">RD</div>
                          <span className="text-sm font-semibold text-on-surface">Rahul Desai</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">+1 (555) 098-1122</td>
                      <td className="px-6 py-5 text-sm font-medium">Post-Op Review</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5 font-bold text-primary text-sm">11:45 AM</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">AP</div>
                          <span className="text-sm font-semibold text-on-surface">Ananya Patel</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">+1 (555) 234-5566</td>
                      <td className="px-6 py-5 text-sm font-medium">Lab Results</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5 font-bold text-primary text-sm">02:15 PM</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-700">VS</div>
                          <span className="text-sm font-semibold text-on-surface">Vikram Singh</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">+1 (555) 778-9900</td>
                      <td className="px-6 py-5 text-sm font-medium text-error font-bold italic">Urgent Consultation</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5 font-bold text-primary text-sm">04:00 PM</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">KI</div>
                          <span className="text-sm font-semibold text-on-surface">Kavya Iyer</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">+1 (555) 345-1234</td>
                      <td className="px-6 py-5 text-sm font-medium">Physical Therapy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Patient Statistics (1/3 width) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xl font-bold text-on-surface tracking-tight">Total Patients</h3>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] ambient-shadow border border-white/50 h-[432px] flex flex-col">
                <div className="flex items-end justify-between h-full gap-2 relative">
                  {/* Simple Visual Chart Representation */}
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-container rounded-t-lg h-24 group-hover:bg-primary/20 transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Mon</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-container rounded-t-lg h-32 group-hover:bg-primary/20 transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Tue</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-primary rounded-t-lg h-48 group-hover:bg-primary transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Wed</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-container rounded-t-lg h-40 group-hover:bg-primary/20 transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Thu</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-container rounded-t-lg h-56 group-hover:bg-primary/20 transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Fri</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-container rounded-t-lg h-16 group-hover:bg-primary/20 transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Sat</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-surface-container rounded-t-lg h-12 group-hover:bg-primary/20 transition-all"></div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Sun</span>
                  </div>
                  {/* Floating Data Tooltip Overlay */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-surface-container-highest/50 backdrop-blur px-4 py-2 rounded-xl border border-white/80">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Weekly Peak</p>
                    <p className="text-xl font-extrabold text-primary text-center leading-none">58</p>
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-surface-container flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Growth Rate</p>
                    <p className="text-lg font-bold text-on-surface">+8.4%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Engagement</p>
                    <p className="text-lg font-bold text-on-surface">High</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button - Only for Primary Intent */}
      <button className="fixed bottom-8 right-8 w-14 h-14 clinical-gradient text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50">
        <span className="material-symbols-outlined text-2xl" data-icon="add">add</span>
      </button>
    </div>
  );
}

export default Dashboard;
