import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:9000';

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}
function bpTrend(bp = '') {
  const [sys] = bp.split('/').map(Number);
  if (!sys) return { label: '—', color: 'text-slate-400' };
  if (sys >= 140) return { label: 'Elevated', color: 'text-red-500' };
  if (sys >= 130) return { label: 'Pre-Hypertension', color: 'text-amber-600' };
  return { label: 'Normal', color: 'text-teal-600' };
}
function sugarTrend(val) {
  if (val == null) return { label: '—', color: 'text-slate-400' };
  if (val > 140) return { label: 'High', color: 'text-red-500' };
  if (val > 100) return { label: 'Moderate', color: 'text-amber-600' };
  return { label: 'Normal', color: 'text-teal-600' };
}
function weightTrend(val) {
  if (val == null) return { label: '—', color: 'text-slate-400' };
  if (val > 90) return { label: 'High', color: 'text-red-500' };
  if (val > 70) return { label: 'Moderate', color: 'text-amber-600' };
  return { label: 'Healthy', color: 'text-teal-600' };
}

// ─── Custom Markdown Renderer ────────────────────────────────────────────────
function renderMarkdown(text) {
  if (!text) return null;
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
        return <strong key={pIdx} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (isHeading) {
        return <h4 key={idx} className="font-bold text-slate-800 text-base mt-4 mb-2">{formattedContent}</h4>;
    }

    if (isBullet) {
      return (
        <div key={idx} className="flex items-start gap-3 mb-2 ml-1">
          <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
          <span className="text-slate-700 leading-relaxed">{formattedContent}</span>
        </div>
      );
    }
    
    // Normal paragraph
    if (line.trim() === '') {
        return <div key={idx} className="h-3"></div>;
    }

    return <p key={idx} className="text-slate-700 leading-relaxed mb-3">{formattedContent}</p>;
  });
}

// ─── Diagnosis Panel Sub-component ───────────────────────────────────────────
function DiagnosisPanel({ patient, onSaved }) {
  const [diseaseName, setDiseaseName]     = useState('');
  const [icdLoading, setIcdLoading]       = useState(false);
  const [icdResults, setIcdResults]       = useState([]);
  const [icdSelected, setIcdSelected]     = useState([]);
  const [icdSaved, setIcdSaved]           = useState(false);
  const [icdError, setIcdError]           = useState('');

  const [medLoading, setMedLoading]       = useState(false);
  const [medResults, setMedResults]       = useState(null);
  const [medSelected, setMedSelected]     = useState([]);
  const [activeTab, setActiveTab]         = useState('ayurveda');
  const [medSaved, setMedSaved]           = useState(false);
  const [medError, setMedError]           = useState('');

  const [saving, setSaving]               = useState(false);

  // Snapshot of what was actually saved — survives reset so summary stays visible
  const [savedIcd, setSavedIcd]           = useState(patient.icdDiagnosis || []);
  const [savedMed, setSavedMed]           = useState(patient.traditionalMedicine || []);
  const [everSaved, setEverSaved]         = useState((patient.icdDiagnosis?.length > 0) || (patient.traditionalMedicine?.length > 0));
  const [resetting, setResetting]         = useState(false);

  // AI Summary states
  const [aiSummary, setAiSummary]         = useState(patient.aiSummary || null);
  const [aiGenerating, setAiGenerating]   = useState(false);
  const [aiError, setAiError]             = useState('');

  // searchDone = true once ICD results are loaded or we are viewing saved DB records
  const searchDone = icdResults.length > 0 || icdLoading || everSaved;

  async function handleIcdSearch() {
    if (!diseaseName.trim()) return;
    setIcdLoading(true);
    setIcdResults([]);
    setIcdSelected([]);
    setIcdError('');
    setIcdSaved(false);
    setMedResults(null);
    setMedSelected([]);
    setMedSaved(false);
    try {
      const searchRes = await axios.post(`${API}/api/icd/search`, { search: diseaseName });
      const raw = searchRes.data;
      if (!raw || raw.length === 0) { setIcdError('No ICD-11 results found.'); return; }
      const codesRes = await axios.post(`${API}/api/icd/codes`, raw);
      setIcdResults(codesRes.data);
    } catch (err) {
      setIcdError(err?.response?.data?.message || 'Failed to search ICD-11. Is the backend running?');
    } finally {
      setIcdLoading(false);
    }
  }

  function toggleIcd(item) {
    setIcdSelected(prev =>
      prev.find(x => x.code === item.code) ? prev.filter(x => x.code !== item.code) : [...prev, item]
    );
  }

  async function handleSaveIcd() {
    if (icdSelected.length === 0) return;
    setSaving(true);
    try {
      await axios.patch(`${API}/api/pateint/update-diagnosis/${patient._id}`, { icdDiagnosis: icdSelected });
      setSavedIcd(icdSelected);   // snapshot for summary
      setIcdSaved(true);
      await fetchTraditionalMedicine();
    } catch (err) { /* silent */ }
    finally { setSaving(false); }
  }

  async function fetchTraditionalMedicine() {
    setMedLoading(true);
    setMedError('');
    try {
      const res = await axios.post(`${API}/api/medicine/search`, { disease_name: diseaseName });
      setMedResults(res.data.results);
    } catch { setMedError('Failed to fetch traditional medicine data.'); }
    finally { setMedLoading(false); }
  }

  function toggleMed(system, item) {
    const key = item.namaste_code || item.namec_code || item.icd11_code;
    const entry = { system, namec_code: key, short_defination: item.short_defination || item.disease_name, long_defination: item.long_defination || item.long_definition };
    setMedSelected(prev =>
      prev.find(x => x.system === system && x.namec_code === key)
        ? prev.filter(x => !(x.system === system && x.namec_code === key))
        : [...prev, entry]
    );
  }

  async function handleSaveMed() {
    if (medSelected.length === 0) return;
    setSaving(true);
    try {
      await axios.patch(`${API}/api/pateint/update-diagnosis/${patient._id}`, { traditionalMedicine: medSelected });
      setSavedMed(medSelected);   // snapshot for summary
      setMedSaved(true);
      setEverSaved(true);         // show summary
      
      // Fire AI summary generation in the background automatically
      generateAISummary();

      if (onSaved) onSaved();
    } catch { /* silent */ }
    finally { setSaving(false); }
  }

  async function generateAISummary() {
    setAiGenerating(true);
    setAiError('');
    try {
        const res = await axios.post(`${API}/api/pateint/generate-summary/${patient._id}`);
        setAiSummary(res.data.aiSummary);
        if (onSaved) onSaved(); // refresh parent to pick up AI summary
    } catch (err) {
        setAiError('Failed to generate AI summary.');
    } finally {
        setAiGenerating(false);
    }
  }

  async function handleReset() {
    setResetting(true);
    try {
      // Clear AI summary explicitly + icd & traditional medicine
      await axios.patch(`${API}/api/pateint/update-diagnosis/${patient._id}`, { icdDiagnosis: [], traditionalMedicine: [], aiSummary: "" });
      setSavedIcd([]); setSavedMed([]); setEverSaved(false); setAiSummary(null);
      setDiseaseName(''); setIcdResults([]); setIcdSelected([]); setIcdSaved(false);
      setIcdError(''); setMedResults(null); setMedSelected([]); setMedSaved(false); setMedError('');
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
    } finally {
      setResetting(false);
    }
  }

  const TABS = ['ayurveda', 'unani', 'sidha'];

  return (
    <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-background flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">clinical_notes</span>
          Final Diagnosis
        </h3>
        <button onClick={handleReset} disabled={resetting}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-slate-500 bg-slate-100 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-200 disabled:opacity-50">
          <span className={`material-symbols-outlined text-base ${resetting ? 'animate-spin' : ''}`}>
            {resetting ? 'progress_activity' : 'refresh'}
          </span>
          Reset DB
        </button>
      </div>

      {/* ── Search bar — ONLY visible before results load; hidden after ── */}
      {!searchDone && (
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Disease Name</label>
          <div className="flex gap-3">
            <input
              className="flex-1 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 px-4 py-3 text-sm placeholder:text-slate-400"
              placeholder="e.g. Jaundice, Diabetes, Asthma..."
              value={diseaseName}
              onChange={e => setDiseaseName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleIcdSearch()}
            />
            <button onClick={handleIcdSearch} disabled={icdLoading || !diseaseName.trim()}
              className="px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">search</span>Search ICD-11
            </button>
          </div>
          {icdError && <p className="text-sm text-red-500 mt-2">{icdError}</p>}
        </div>
      )}

      {/* Loading spinner */}
      {icdLoading && (
        <div className="flex items-center gap-3 py-2 text-teal-500">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span className="text-sm text-slate-500">Searching ICD-11 for "<b>{diseaseName}</b>"…</span>
        </div>
      )}

      {/* ── ICD Results ── */}
      {icdResults.length > 0 && (
        <div>
          {/* Searched-for tag */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="material-symbols-outlined text-primary text-base">manage_search</span>
            <span className="text-sm font-semibold text-slate-600">Results for:</span>
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">{diseaseName}</span>
            <span className="text-xs text-slate-400 ml-auto">{icdResults.length} found · <b className="text-primary">{icdSelected.length}</b> selected</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {icdResults.map(item => {
              const checked = !!icdSelected.find(x => x.code === item.code);
              return (
                <label key={item.code}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition-all ${checked ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggleIcd(item)}
                    className="mt-1 accent-teal-600 w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">{item.code}</span>
                      <p className="text-sm font-bold text-on-background">{item.name}</p>
                    </div>
                    {item.description && (
                      <p className="text-sm text-slate-600 leading-relaxed mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          {!icdSaved && (
            <div className="flex justify-end mt-4">
              <button onClick={handleSaveIcd} disabled={saving || icdSelected.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                {saving ? <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  : <span className="material-symbols-outlined text-base">save</span>}
                Save ICD Diagnosis ({icdSelected.length})
              </button>
            </div>
          )}
          {icdSaved && (
            <div className="mt-3 flex items-center gap-2 text-teal-600 text-sm font-semibold">
              <span className="material-symbols-outlined text-base">check_circle</span>
              ICD diagnosis saved to patient record.
            </div>
          )}
        </div>
      )}

      {/* ── Traditional Medicine loading ── */}
      {medLoading && (
        <div className="flex items-center gap-3 py-4 text-teal-500">
          <span className="material-symbols-outlined animate-spin">progress_activity</span>
          <span className="text-sm text-slate-500">Fetching Ayurveda · Unani · Sidha records…</span>
        </div>
      )}

      {/* ── Traditional Medicine Results ── */}
      {medResults && !medLoading && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-slate-600">Traditional Medicine</p>
            <span className="text-xs text-slate-400"><b className="text-amber-600">{medSelected.length}</b> selected</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 p-1 bg-slate-100 rounded-xl w-fit">
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-700'}`}>
                {tab}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                  {(medResults[tab] || []).length}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {(medResults[activeTab] || []).length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No {activeTab} records matched for "{diseaseName}".</p>
            ) : (
              (medResults[activeTab] || []).map((item, idx) => {
                const key = item.namaste_code || item.namec_code || item.icd11_code;
                const checked = !!medSelected.find(x => x.system === activeTab && x.namec_code === key);
                return (
                  <label key={item._id || idx}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition-all ${checked ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleMed(activeTab, item)}
                      className="mt-1 accent-amber-500 w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">{key}</span>
                        <p className="text-sm font-bold text-on-background">{item.short_defination || item.disease_name}</p>
                      </div>
                      {(item.long_defination || item.long_definition) && (
                        <p className="text-sm text-slate-600 leading-relaxed mt-1">
                          {item.long_defination || item.long_definition}
                        </p>
                      )}
                    </div>
                  </label>
                );
              })
            )}
          </div>

          {!medSaved && (
            <div className="flex justify-end mt-4">
              <button onClick={handleSaveMed} disabled={saving || medSelected.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white rounded-full text-sm font-bold shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                {saving
                  ? <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                  : <span className="material-symbols-outlined text-base">save</span>
                }
                Save Traditional Medicine ({medSelected.length})
              </button>
            </div>
          )}
        </div>
      )}

      {medError && <p className="text-sm text-red-500">{medError}</p>}

      {/* ── Saved Diagnosis Summary — persists even after Reset ── */}
      {everSaved && (
        <div className="space-y-5 pt-4 border-t-2 border-teal-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-500 text-2xl">verified</span>
            <p className="text-base font-bold text-teal-600">Diagnosis Complete &amp; Saved</p>
          </div>

          {/* ICD Summary */}
          {savedIcd.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">ICD-11 Diagnoses</p>
              <div className="space-y-2">
                {savedIcd.map(item => (
                  <div key={item.code} className="flex items-start gap-3 bg-primary/5 border border-primary/10 p-4 rounded-xl">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full flex-shrink-0 mt-0.5">{item.code}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-on-background">{item.name}</p>
                      {item.description && <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Traditional Medicine Summary */}
          {savedMed.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Traditional Medicine</p>
              {['ayurveda', 'unani', 'sidha'].map(sys => {
                const entries = savedMed.filter(x => x.system === sys);
                if (entries.length === 0) return null;
                return (
                  <div key={sys} className="mb-4">
                    <p className="text-xs font-bold text-amber-600 capitalize mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>{sys}
                    </p>
                    <div className="space-y-2">
                      {entries.map((entry, i) => (
                        <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-100 p-4 rounded-xl">
                          <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex-shrink-0 mt-0.5">{entry.namec_code}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-on-background">{entry.short_defination}</p>
                            {entry.long_defination && <p className="text-sm text-slate-600 mt-1 leading-relaxed">{entry.long_defination}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* AI Clinical Summary UI */}
          {aiGenerating && (
            <div className="mt-6 p-5 border border-indigo-100 bg-indigo-50/50 rounded-2xl flex items-center gap-3">
               <span className="material-symbols-outlined animate-spin text-indigo-500">progress_activity</span>
               <p className="text-sm font-bold text-indigo-700">🤖 Generating AI Clinical Assessment...</p>
            </div>
          )}

          {aiError && <p className="text-sm text-red-500">{aiError}</p>}

          {aiSummary && !aiGenerating && (
            <div className="mt-6 animate-fade-in">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    LLM Clinical Assessment
                </p>
                <div className="p-6 bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-100 rounded-2xl shadow-sm">
                    {renderMarkdown(aiSummary)}
                </div>
            </div>
          )}
        </div>
      )}


    </div>
  );
}

// ─── Main PatientHistory Component ───────────────────────────────────────────
function PatientHistory() {
  const [patients, setPatients]       = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Layout states for drawers
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patientsListOpen, setPatientsListOpen] = useState(false);

  const fetchPatients = async (soft = false) => {
    try {
      if (!soft) setLoading(true);
      setError(null);
      const res = await axios.post(`${API}/api/pateint/get-pateint`);
      setPatients(res.data);
      // Only set to 0 if we are doing a hard reload and patients changed
      // Otherwise we maintain the currently selected index
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load patients. Is the backend running?');
    } finally {
      if (!soft) setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const current = patients[selectedIndex] || null;
  const bp      = current ? bpTrend(current.bloodPressure) : {};
  const sugar   = current ? sugarTrend(current.sugarLevel) : {};
  const weight  = current ? weightTrend(current.weight) : {};

  return (
    <div className="bg-background text-on-background antialiased overflow-hidden min-h-screen">

      {/* Sidebar Overlay (optional mobile bg overlay can be added here) */}
      <aside className={`fixed left-0 top-0 h-full w-64 z-50 bg-slate-50 border-r border-slate-200/50 flex flex-col p-4 font-['Inter'] text-sm tracking-wide transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 px-4">
          <h1 className="text-lg font-bold text-teal-700 tracking-tight">Medi Bridge</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Clinical Portal</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" to="/dashboard">
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200" to="/audit-history">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span> Audit History
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-white text-teal-600 rounded-xl font-semibold shadow-sm" to="/patient-history">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span> Patient History
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-slate-200/50 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all" href="#">
            <span className="material-symbols-outlined">settings</span> Settings
          </a>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all" to="/">
            <span className="material-symbols-outlined">logout</span> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`min-h-screen flex flex-col relative transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        
        {/* TopBar */}
        <header className={`fixed top-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)] transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-64' : 'left-0'}`}>
          <div className="flex items-center gap-4">
            
            {/* Hamburger Menus */}
            <div className="flex gap-1.5 -ml-4 mr-2">
                <button title="Toggle Sidebar" onClick={() => setSidebarOpen(!sidebarOpen)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${sidebarOpen ? 'bg-teal-50 text-teal-600' : 'text-slate-500 hover:bg-slate-100'}`}>
                    <span className="material-symbols-outlined text-xl">menu</span>
                </button>
                <button title="Toggle Patient List" onClick={() => setPatientsListOpen(!patientsListOpen)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${patientsListOpen ? 'bg-teal-50 text-teal-600' : 'text-slate-500 hover:bg-slate-100'}`}>
                    <span className="material-symbols-outlined text-xl">group</span>
                </button>
            </div>

            <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-400" placeholder="Search records..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-teal-600 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
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

          {/* Patient list sidebar (Toggleable) */}
          <section className={`bg-surface-container-low flex flex-col overflow-hidden transition-all duration-300 ease-in-out border-slate-200 ${patientsListOpen ? 'w-80 border-r' : 'w-0 border-r-0'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-tight text-on-surface">Active Patients</h2>
                <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">
                  {loading ? '…' : patients.length} TOTAL
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <span className="material-symbols-outlined text-teal-400 text-3xl animate-spin">progress_activity</span>
                  <p className="text-xs text-slate-400">Loading patients…</p>
                </div>
              )}
              {!loading && error && (
                <div className="bg-red-50 text-red-600 rounded-xl p-4 text-xs leading-relaxed">
                  <p className="font-bold mb-1">Connection Error</p><p>{error}</p>
                </div>
              )}
              {!loading && !error && patients.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-3xl">person_off</span>
                  <p className="text-xs">No patients found.</p>
                </div>
              )}
              {!loading && !error && patients.map((patient, idx) => (
                <div key={patient._id} onClick={() => setSelectedIndex(idx)}
                  className={`p-4 rounded-xl cursor-pointer transition-all group ${selectedIndex === idx ? 'bg-surface-container-lowest shadow-sm border border-primary/10' : 'bg-transparent hover:bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedIndex === idx ? 'bg-primary-container/20 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                      {getInitials(patient.username)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${selectedIndex === idx ? 'font-bold text-on-background' : 'font-medium text-slate-600 group-hover:text-on-background'}`}>
                        {patient.username}
                      </p>
                      <p className="text-[10px] text-slate-500">{patient.age} yrs • {patient.gender}</p>
                    </div>
                    {selectedIndex === idx && <span className="material-symbols-outlined text-primary text-sm">chevron_right</span>}
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

          {/* Detail view */}
          <section className="flex-1 overflow-y-auto no-scrollbar bg-background p-8">
            {!current && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                <span className="material-symbols-outlined text-5xl">person_search</span>
                <p className="text-sm">No patient selected.</p>
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

                {/* Profile Hero */}
                <div className="relative bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)] flex items-end gap-8 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                  <div className="relative w-40 h-40 rounded-3xl ring-4 ring-background shadow-lg bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                    <span className="text-5xl font-bold text-teal-600">{getInitials(current.username)}</span>
                  </div>
                  <div className="relative flex-1 pb-2">
                    <h2 className="text-4xl font-bold tracking-tight text-on-background leading-none mb-1">{current.username}</h2>
                    <p className="text-slate-500 mb-4 font-medium">Patient ID: {current._id?.slice(-8).toUpperCase()}</p>
                    <div className="flex gap-10">
                      {[['Gender', current.gender], ['Age', `${current.age} yrs`], ['Height', `${current.height} cm`], ['Weight', `${current.weight} kg`], ['Blood', <span className="text-primary">{current.bloodGroup}</span>], ['Phone', current.phoneNumber]].map(([label, val]) => (
                        <div key={label} className="space-y-1">
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{label}</p>
                          <p className="text-sm font-semibold text-on-background">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vitals grid */}
                <div className="grid grid-cols-4 gap-6">
                  {[
                    { icon: 'monitor_weight', bg: 'teal', label: 'Weight', val: `${current.weight}`, unit: 'kg', trend: weight },
                    { icon: 'blood_pressure', bg: 'rose', label: 'Blood Pressure', val: current.bloodPressure, unit: 'mmHg', trend: bp },
                    { icon: 'glucose', bg: 'amber', label: 'Sugar Level', val: `${current.sugarLevel}`, unit: 'mg/dL', trend: sugar },
                    { icon: 'favorite', bg: 'sky', label: 'Heart Rate', val: `${current.heartRate}`, unit: 'bpm', pulse: true },
                  ].map(({ icon, bg, label, val, unit, trend, pulse }) => (
                    <div key={label} className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                      <div className="flex justify-between items-start">
                        <div className={`w-10 h-10 rounded-full bg-${bg}-50 flex items-center justify-center text-${bg}-500`}>
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                        </div>
                        {pulse
                          ? <span className="material-symbols-outlined text-sky-500 animate-pulse text-xs">pulse_alert</span>
                          : <span className={`text-[10px] font-bold ${trend?.color}`}>{trend?.label}</span>
                        }
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{label}</p>
                        <p className="text-2xl font-bold text-on-background">{val} <span className="text-xs font-medium text-slate-400">{unit}</span></p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Diagnosis + Side panel */}
                <div className="grid grid-cols-3 gap-6">

                  {/* Main: Final Diagnosis Panel */}
                  <div className="col-span-2">
                    {/* key={current._id} resets the panel state when a new patient is selected */}
                    <DiagnosisPanel key={current._id} patient={current} onSaved={() => fetchPatients(true)} />
                  </div>

                  {/* Right: Vitals + Info */}
                  <div className="col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm">
                      <h3 className="text-sm font-bold text-on-background mb-4 uppercase tracking-tight">Vitals at a Glance</h3>
                      <div className="space-y-3">
                        {[['favorite', 'text-rose-400', 'Heart Rate', `${current.heartRate} bpm`],
                          ['monitor_weight', 'text-teal-400', 'Weight', `${current.weight} kg`],
                          ['glucose', 'text-amber-400', 'Sugar', `${current.sugarLevel} mg/dL`],
                          ['blood_pressure', 'text-rose-500', 'Blood Pressure', current.bloodPressure],
                        ].map(([icon, color, label, val]) => (
                          <div key={label} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-2">
                              <span className={`material-symbols-outlined ${color} text-base`}>{icon}</span>
                              <span className="text-xs text-slate-600">{label}</span>
                            </div>
                            <span className="text-sm font-bold text-on-background">{val}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-5 py-2 bg-surface-container-low text-primary text-[10px] font-bold rounded-full hover:bg-primary-container hover:text-white transition-all uppercase tracking-widest">
                        View All Records
                      </button>
                    </div>

                    <div className="bg-primary/5 p-6 rounded-[1.5rem] border border-primary/10 space-y-3">
                      <h3 className="text-xs font-bold text-primary uppercase tracking-tight">Patient Info</h3>
                      {[
                        { icon: 'person', label: current.username, sub: `${current.gender} • ${current.age} yrs` },
                        { icon: 'bloodtype', label: current.bloodGroup, sub: 'Blood Group' },
                      ].map(({ icon, label, sub }) => (
                        <div key={sub} className="flex items-center gap-3 bg-white/50 p-3 rounded-xl">
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                            <span className="material-symbols-outlined text-lg">{icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-on-background truncate">{label}</p>
                            <p className="text-[9px] text-slate-500">{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}
          </section>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  );
}

export default PatientHistory;
