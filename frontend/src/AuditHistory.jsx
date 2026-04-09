import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from './config';



function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Custom Markdown Renderer (same one from PatientHistory) ────────────────
function renderMarkdown(text) {
  if (!text) return <p className="text-sm text-slate-500 italic">No final diagnosis logged yet.</p>;
  return text.split('\n').map((line, idx) => {
    let isBullet = false;
    let content = line;
    if (line.trim().match(/^[-*]\s/)) {
      isBullet = true;
      content = line.replace(/^[-*]\s/, ''); // strip prefix
    }
    let isHeading = false;
    if (content.trim().match(/^#+\s/)) {
        isHeading = true;
        content = content.replace(/^#+\s/, '');
    }
    const parts = content.split(/(\*\*.*?\*\*)/g);
    const formattedContent = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} className="font-bold text-slate-900 dark:text-slate-100">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (isHeading) {
        return <h4 key={idx} className="font-bold text-slate-800 dark:text-slate-200 text-base mt-4 mb-2">{formattedContent}</h4>;
    }
    if (isBullet) {
      return (
        <div key={idx} className="flex items-start gap-3 mb-2 ml-1">
          <span className="text-teal-500 mt-1 flex-shrink-0">•</span>
          <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{formattedContent}</span>
        </div>
      );
    }
    if (line.trim() === '') return <div key={idx} className="h-3"></div>;
    return <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{formattedContent}</p>;
  });
}

function formatDate(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function AuditHistory() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auditEvents, setAuditEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Fetch Patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.post(`${API}/api/pateint/get-pateint`);
        setPatients(res.data);
        if (res.data.length > 0) setSelectedPatientId(res.data[0]._id);
      } catch (err) {
        console.error("Failed to load patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Fetch Audit History
  useEffect(() => {
    if (!selectedPatientId) return;
    const fetchAudit = async () => {
      setLoadingEvents(true);
      try {
        const res = await axios.get(`${API}/api/audit/${selectedPatientId}`);
        setAuditEvents(res.data.events || []);
      } catch (err) {
        console.error("Failed to load audit history", err);
        setAuditEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchAudit();
  }, [selectedPatientId]);

  const currentPatient = patients.find(p => p._id === selectedPatientId) || null;

  return (
    <div className="bg-background text-on-background antialiased overflow-hidden min-h-screen">
      {/* Persistent SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-slate-50 dark:bg-slate-900 border-r border-slate-200/50 dark:border-slate-800 flex flex-col p-4 font-['Inter'] text-sm tracking-wide">
        <div className="mb-10 px-4">
          <h1 className="text-lg font-bold text-teal-700 dark:text-teal-300 tracking-tight">Medi Bridge</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold mt-1">Clinical Portal</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
            to="/dashboard">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            Dashboard
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 rounded-xl font-semibold shadow-sm"
            to="/audit-history">
            <span className="material-symbols-outlined" data-icon="fact_check" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            Audit History
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200"
            to="/patient-history">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            Patient History
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-800 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            Settings
          </a>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all" to="/">
            <span className="material-symbols-outlined" data-icon="logout">logout</span>
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 min-h-screen flex flex-col relative dark:bg-slate-950">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 left-64 z-40 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex justify-between items-center px-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)] dark:shadow-none">
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-low dark:bg-slate-900 px-4 py-2 rounded-full flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-lg" data-icon="search">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-400 text-slate-900 dark:text-slate-100 outline-none" placeholder="Search audits..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-teal-600 transition-colors">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>

          </div>
        </header>

        <div className="pt-16 flex h-[calc(100vh-64px)] overflow-hidden">
          {/* Patient List Sidebar */}
          <section className="w-80 bg-surface-container-low dark:bg-slate-900/50 flex flex-col overflow-hidden border-r border-slate-200/50 dark:border-slate-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-tight text-on-surface dark:text-slate-200">Recent Audits</h2>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 text-[10px] font-bold rounded-full">{patients.length} TOTAL</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">
              {loading ? (
                 <div className="flex justify-center p-8"><span className="material-symbols-outlined animate-spin text-teal-500">progress_activity</span></div>
              ) : patients.map((patient) => (
                <div
                  key={patient._id}
                  onClick={() => setSelectedPatientId(patient._id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all group ${selectedPatientId === patient._id
                    ? 'bg-white dark:bg-slate-800 shadow-sm border border-teal-500/20'
                    : 'bg-transparent hover:bg-white/60 dark:hover:bg-slate-800/50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedPatientId === patient._id ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                      {getInitials(patient.username)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${selectedPatientId === patient._id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {patient.username}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">ID: #{patient._id.slice(-6).toUpperCase()} • {patient.age} yrs</p>
                    </div>
                    {selectedPatientId === patient._id && (
                      <span className="material-symbols-outlined text-teal-500 text-sm" data-icon="chevron_right">chevron_right</span>
                    )}
                  </div>
                  {selectedPatientId === patient._id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                      <span>Updated: {formatDate(patient.updatedAt)}</span>
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Audit View */}
          <section className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50 dark:bg-slate-950 p-8">
            {!currentPatient ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                 <span className="material-symbols-outlined text-5xl">person_search</span>
                 <p className="text-sm">Select a patient to view audit history.</p>
              </div>
            ) : (
            <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
              {/* Audit Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">gavel</span>
                    Clinical Audit Trail
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Patient ID: {currentPatient._id} — Last Updated: {formatDate(currentPatient.updatedAt)}</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Left side: Clinical Interactions */}
                <div className="space-y-6">
                  
                  {/* Final Diagnosis add by physician */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">record_voice_over</span>
                        Final Diagnosis added by Physician
                      </div>
                      {currentPatient.updatedBy && (
                        <span className="text-[10px] font-bold bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2 py-1 rounded flex items-center gap-1">
                           <span className="material-symbols-outlined text-[12px]">person</span>
                           {currentPatient.updatedBy}
                        </span>
                      )}
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl text-sm border border-slate-100 dark:border-slate-800 font-medium italic">
                      {currentPatient.searchQuery ? `"${currentPatient.searchQuery}"` : <span className="text-slate-400 not-italic">No search query recorded yet.</span>}
                    </div>
                  </div>

                  {/* Doctor Selected Options */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 text-sm">done_all</span>
                      Doctor Selected Options
                    </h3>
                    
                    <div className="space-y-4">
                      {/* ICD Diagnosis List */}
                      {(!currentPatient.icdDiagnosis?.length && !currentPatient.traditionalMedicine?.length) && (
                         <p className="text-sm text-slate-500 italic">No diagnosis has been saved yet.</p>
                      )}
                      
                      {currentPatient.icdDiagnosis?.map((icd, idx) => (
                        <div key={idx} className="border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 rounded-xl p-4 relative shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-900 text-[10px] font-bold rounded text-slate-700 dark:text-slate-300">ICD-11 CODE</span>
                            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-wider bg-teal-50 dark:bg-teal-900/30 px-2 py-0.5 rounded">{icd.code}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">{icd.name}</p>
                        </div>
                      ))}

                      {/* Traditional Medicine List */}
                      {currentPatient.traditionalMedicine?.map((med, idx) => (
                        <div key={`med-${idx}`} className="border-2 border-indigo-50 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-xl p-4 relative shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-[10px] font-bold rounded text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">{med.system} THERAPY</span>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded">{med.namec_code}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">{med.short_defination}</p>
                          {med.long_defination && (
                             <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{med.long_defination}</p>
                          )}
                        </div>
                      ))}

                    </div>
                  </div>
                </div>

              </div>
            </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuditHistory;
