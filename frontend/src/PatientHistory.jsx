import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Helper: derive initials from username
function getInitials(name = '') {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Helper: classify blood pressure trend
function bpTrend(bp = '') {
  const [sys] = bp.split('/').map(Number);
  if (!sys) return { label: '—', color: 'text-slate-400' };
  if (sys >= 140) return { label: 'Elevated', color: 'text-red-500' };
  if (sys >= 130) return { label: 'Pre-Hypertension', color: 'text-amber-600' };
  return { label: 'Normal', color: 'text-teal-600' };
}

// Helper: classify sugar level trend
function sugarTrend(val) {
  if (val == null) return { label: '—', color: 'text-slate-400' };
  if (val > 140) return { label: 'High', color: 'text-red-500' };
  if (val > 100) return { label: 'Moderate', color: 'text-amber-600' };
  return { label: 'Normal', color: 'text-teal-600' };
}

// Helper: classify weight trend (just display it)
function weightTrend(val) {
  if (val == null) return { label: '—', color: 'text-slate-400' };
  if (val > 90) return { label: 'High', color: 'text-red-500' };
  if (val > 70) return { label: 'Moderate', color: 'text-amber-600' };
  return { label: 'Healthy', color: 'text-teal-600' };
}

function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.post('http://localhost:3000/api/pateint/get-pateint');
        setPatients(res.data);
        setSelectedIndex(0);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError(err?.response?.data?.message || 'Failed to load patients. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const current = patients[selectedIndex] || null;
  const bp = current ? bpTrend(current.bloodPressure) : {};
  const sugar = current ? sugarTrend(current.sugarLevel) : {};
  const weight = current ? weightTrend(current.weight) : {};

  return (
    <div className="bg-background text-on-background antialiased overflow-hidden min-h-screen">
      {/* Persistent SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-slate-50 border-r border-slate-200/50 flex flex-col p-4 font-['Inter'] text-sm tracking-wide">
        <div className="mb-10 px-4">
          <h1 className="text-lg font-bold text-teal-700 tracking-tight">Medi Bridge</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Clinical Portal</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" to="/dashboard">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            Dashboard
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" to="/audit-history">
            <span className="material-symbols-outlined" data-icon="fact_check" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            Audit History
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-white text-teal-600 rounded-xl font-semibold shadow-sm" to="/patient-history">
            <span className="material-symbols-outlined" data-icon="history_edu" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
            Patient History
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-200/50 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            Settings
          </a>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all" to="/">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen flex flex-col relative">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 left-64 z-40 h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-lg" data-icon="search">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-400" placeholder="Search records..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-teal-600 transition-colors">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
            </button>
            <button className="text-slate-500 hover:text-teal-600 transition-colors">
              <span className="material-symbols-outlined" data-icon="help">help</span>
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <div className="text-right">
                <p className="text-xs font-bold text-on-background">Dr. Julian Vance</p>
                <p className="text-[10px] text-slate-500">Chief of Cardiology</p>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-16 flex h-[calc(100vh-64px)] overflow-hidden">
          {/* Patient List Sidebar */}
          <section className="w-80 bg-surface-container-low flex flex-col overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-tight text-on-surface">Active Patients</h2>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
                  {loading ? '…' : patients.length} TOTAL
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">
              {/* Loading state */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <span className="material-symbols-outlined text-teal-400 text-3xl animate-spin">progress_activity</span>
                  <p className="text-xs text-slate-400">Loading patients…</p>
                </div>
              )}

              {/* Error state */}
              {!loading && error && (
                <div className="bg-red-50 text-red-600 rounded-xl p-4 text-xs leading-relaxed">
                  <p className="font-bold mb-1">Connection Error</p>
                  <p>{error}</p>
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && patients.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-3xl">person_off</span>
                  <p className="text-xs">No patients found in the database.</p>
                </div>
              )}

              {/* Patient list */}
              {!loading && !error && patients.map((patient, idx) => (
                <div
                  key={patient._id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`p-4 rounded-xl cursor-pointer transition-all group ${
                    selectedIndex === idx
                      ? 'bg-surface-container-lowest shadow-sm border border-primary/10'
                      : 'bg-transparent hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      selectedIndex === idx ? 'bg-primary-container/20 text-primary' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {getInitials(patient.username)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${
                        selectedIndex === idx ? 'font-bold text-on-background' : 'font-medium text-slate-600 group-hover:text-on-background'
                      }`}>
                        {patient.username}
                      </p>
                      <p className="text-[10px] text-slate-500">{patient.age} yrs • {patient.gender}</p>
                    </div>
                    {selectedIndex === idx && (
                      <span className="material-symbols-outlined text-primary text-sm" data-icon="chevron_right">chevron_right</span>
                    )}
                  </div>
                  {selectedIndex === idx && (
                    <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">{patient.phoneNumber}</span>
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Selected View */}
          <section className="flex-1 overflow-y-auto no-scrollbar bg-background p-8">
            {!current && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                <span className="material-symbols-outlined text-5xl">person_search</span>
                <p className="text-sm">{error ? 'Could not load patient data.' : 'No patient selected.'}</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-teal-500">
                <span className="material-symbols-outlined text-5xl animate-spin">progress_activity</span>
                <p className="text-sm text-slate-400">Fetching patient records…</p>
              </div>
            )}

            {!loading && current && (
              <div className="max-w-5xl mx-auto space-y-8">
                {/* Section 1: Personal Profile Hero */}
                <div className="relative bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)] flex items-end gap-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                  {/* Avatar placeholder (no photo in schema) */}
                  <div className="relative w-40 h-40 rounded-3xl overflow-hidden ring-4 ring-background shadow-lg bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                    <span className="text-5xl font-bold text-teal-600">{getInitials(current.username)}</span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-4xl font-bold tracking-tight text-on-background leading-none">{current.username}</h2>
                        <p className="text-slate-500 mt-2 font-medium">Patient ID: {current._id?.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-slate-200 transition-colors">
                          <span className="material-symbols-outlined text-slate-600" data-icon="edit">edit</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-slate-200 transition-colors">
                          <span className="material-symbols-outlined text-slate-600" data-icon="share">share</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-12">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Gender</p>
                        <p className="text-sm font-semibold text-on-background">{current.gender}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Age</p>
                        <p className="text-sm font-semibold text-on-background">{current.age} Years</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Height</p>
                        <p className="text-sm font-semibold text-on-background">{current.height} cm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Weight</p>
                        <p className="text-sm font-semibold text-on-background">{current.weight} kg</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Blood Group</p>
                        <p className="text-sm font-semibold text-primary">{current.bloodGroup}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Phone</p>
                        <p className="text-sm font-semibold text-on-background">{current.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Biological Data Bento Grid */}
                <div className="grid grid-cols-4 gap-6">
                  {/* Weight */}
                  <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                        <span className="material-symbols-outlined" data-icon="monitor_weight">monitor_weight</span>
                      </div>
                      <span className={`text-[10px] font-bold ${weight.color}`}>{weight.label}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Weight</p>
                      <p className="text-2xl font-bold text-on-background">{current.weight} <span className="text-xs font-medium text-slate-400">kg</span></p>
                    </div>
                  </div>

                  {/* Blood Pressure */}
                  <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                        <span className="material-symbols-outlined" data-icon="blood_pressure" style={{ fontVariationSettings: "'FILL' 1" }}>blood_pressure</span>
                      </div>
                      <span className={`text-[10px] font-bold ${bp.color}`}>{bp.label}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Blood Pressure</p>
                      <p className="text-2xl font-bold text-on-background">{current.bloodPressure} <span className="text-xs font-medium text-slate-400">mmHg</span></p>
                    </div>
                  </div>

                  {/* Sugar Level */}
                  <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                        <span className="material-symbols-outlined" data-icon="glucose">glucose</span>
                      </div>
                      <span className={`text-[10px] font-bold ${sugar.color}`}>{sugar.label}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Sugar Level</p>
                      <p className="text-2xl font-bold text-on-background">{current.sugarLevel} <span className="text-xs font-medium text-slate-400">mg/dL</span></p>
                    </div>
                  </div>

                  {/* Heart Rate */}
                  <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
                        <span className="material-symbols-outlined" data-icon="favorite" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </div>
                      <span className="material-symbols-outlined text-sky-500 animate-pulse text-xs" data-icon="pulse">pulse_alert</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Heart Rate</p>
                      <p className="text-2xl font-bold text-on-background">{current.heartRate} <span className="text-xs font-medium text-slate-400">bpm</span></p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Clinical Info */}
                <div className="grid grid-cols-3 gap-6">
                  {/* Left: Patient Details Panel */}
                  <div className="col-span-2 space-y-6">
                    <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm">
                      <h3 className="text-lg font-bold text-on-background mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary" data-icon="clinical_notes">clinical_notes</span>
                        Clinical Summary
                      </h3>
                      <div className="space-y-6">
                        <div className="bg-surface-container-low p-4 rounded-2xl">
                          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">Patient Overview</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase text-slate-400 font-bold">Blood Group</p>
                              <p className="text-sm font-semibold text-primary">{current.bloodGroup}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase text-slate-400 font-bold">Contact</p>
                              <p className="text-sm font-semibold text-on-background">{current.phoneNumber}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase text-slate-400 font-bold">Height</p>
                              <p className="text-sm font-semibold text-on-background">{current.height} cm</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[10px] uppercase text-slate-400 font-bold">Weight</p>
                              <p className="text-sm font-semibold text-on-background">{current.weight} kg</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 border-l-4 border-primary bg-slate-50 rounded-r-xl">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Heart Rate Status</p>
                            <p className="text-sm font-bold text-on-background">
                              {current.heartRate >= 100 ? '⚠️ Tachycardia' : current.heartRate < 60 ? '⚠️ Bradycardia' : '✅ Normal Range'}
                            </p>
                          </div>
                          <div className="p-4 border-l-4 border-tertiary-container bg-slate-50 rounded-r-xl">
                            <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">BP Status</p>
                            <p className="text-sm font-bold text-on-background">{bp.label}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Doctor's Symptoms Observation</label>
                          <textarea
                            className="w-full bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 p-4 text-sm placeholder:text-slate-400"
                            placeholder="Enter patient symptoms and clinical observations..."
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="flex justify-end pt-2">
                          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm" data-icon="save">save</span>
                            Update Case File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Vitals Quick Panel */}
                  <div className="col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm">
                      <h3 className="text-sm font-bold text-on-background mb-4 uppercase tracking-tight">Vitals at a Glance</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-rose-400 text-base">favorite</span>
                            <span className="text-xs text-slate-600">Heart Rate</span>
                          </div>
                          <span className="text-sm font-bold text-on-background">{current.heartRate} bpm</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-teal-400 text-base">monitor_weight</span>
                            <span className="text-xs text-slate-600">Weight</span>
                          </div>
                          <span className="text-sm font-bold text-on-background">{current.weight} kg</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-400 text-base">glucose</span>
                            <span className="text-xs text-slate-600">Sugar</span>
                          </div>
                          <span className="text-sm font-bold text-on-background">{current.sugarLevel} mg/dL</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-rose-500 text-base">blood_pressure</span>
                            <span className="text-xs text-slate-600">Blood Pressure</span>
                          </div>
                          <span className="text-sm font-bold text-on-background">{current.bloodPressure}</span>
                        </div>
                      </div>
                      <button className="w-full mt-6 py-2 bg-surface-container-low text-primary text-[10px] font-bold rounded-full hover:bg-primary-container hover:text-white transition-all uppercase tracking-widest">
                        View All Records
                      </button>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-[1.5rem] border border-primary/10">
                      <h3 className="text-xs font-bold text-primary mb-3 uppercase tracking-tight">Patient Info</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                            <span className="material-symbols-outlined text-lg" data-icon="person">person</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-on-background truncate">{current.username}</p>
                            <p className="text-[9px] text-slate-500">{current.gender} • {current.age} yrs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                            <span className="material-symbols-outlined text-lg" data-icon="bloodtype">bloodtype</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-on-background truncate">{current.bloodGroup}</p>
                            <p className="text-[9px] text-slate-500">Blood Group</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl" data-icon="add">add</span>
      </button>
    </div>
  );
}

export default PatientHistory;
