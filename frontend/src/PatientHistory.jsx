import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function PatientHistory() {
  const [selectedPatient, setSelectedPatient] = useState('MB-9281');

  const patientsRaw = [
    { id: 'MB-9281', name: 'Priya Sharma', initials: 'PS', gender: 'Female', age: 28, height: '165 cm', weight: '62 kg', bg: 'primary-container/20', text: 'primary' },
    { id: 'MB-4412', name: 'Rahul Desai', initials: 'RD', gender: 'Male', age: 45, height: '178 cm', weight: '85 kg', bg: 'slate-200', text: 'slate-500' },
    { id: 'MB-3019', name: 'Ananya Patel', initials: 'AP', gender: 'Female', age: 32, height: '160 cm', weight: '58 kg', bg: 'slate-200', text: 'slate-500' },
    { id: 'MB-8821', name: 'Vikram Singh', initials: 'VS', gender: 'Male', age: 51, height: '172 cm', weight: '76 kg', bg: 'slate-200', text: 'slate-500' },
    { id: 'MB-1129', name: 'Kavya Iyer', initials: 'KI', gender: 'Female', age: 24, height: '168 cm', weight: '55 kg', bg: 'slate-200', text: 'slate-500' },
    { id: 'MB-5567', name: 'Rohan Verma', initials: 'RV', gender: 'Male', age: 39, height: '180 cm', weight: '90 kg', bg: 'slate-200', text: 'slate-500' },
  ];

  const fullPatientData = {
    'MB-9281': {
        phone: '+91 98765 43210',
        blood: 'O Positive',
        weightDisplay: { val: '62', trend: '+1.2%', color: 'success text-teal-600', icon: 'teal-50 text-teal-600' },
        bpDisplay: { val: '120/80', trend: 'Normal', color: 'slate-400', icon: 'rose-50 text-rose-500' },
        sugarDisplay: { val: '95', trend: 'Fasting', color: 'amber-600', icon: 'amber-50 text-amber-500' },
        heartRateDisplay: { val: '72' },
        diagnosis: { title: 'Mild Persistent Asthma with Allergic Rhinitis', code: 'J45.30', type: 'Acute Phase', urgency: 'Moderate Follow-up' },
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
    },
    'MB-4412': {
        phone: '+91 87654 32109',
        blood: 'B Positive',
        weightDisplay: { val: '85', trend: '-2.0%', color: 'success text-teal-600', icon: 'teal-50 text-teal-600' },
        bpDisplay: { val: '145/90', trend: 'Elevated', color: 'error text-red-500', icon: 'rose-50 text-rose-500' },
        sugarDisplay: { val: '110', trend: 'Fasting', color: 'amber-600', icon: 'amber-50 text-amber-500' },
        heartRateDisplay: { val: '88' },
        diagnosis: { title: 'Essential Hypertension', code: 'I10', type: 'Chronic', urgency: 'Urgent Consultation' },
        img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200'
    },
    'MB-3019': {
        phone: '+91 76543 21098',
        blood: 'A Positive',
        weightDisplay: { val: '58', trend: '-1.0%', color: 'success text-teal-600', icon: 'teal-50 text-teal-600' },
        bpDisplay: { val: '110/70', trend: 'Normal', color: 'slate-400', icon: 'rose-50 text-rose-500' },
        sugarDisplay: { val: '180', trend: 'Fasting', color: 'error text-red-500', icon: 'amber-50 text-amber-500' },
        heartRateDisplay: { val: '76' },
        diagnosis: { title: 'Type 2 Diabetes Mellitus', code: 'E11.9', type: 'Chronic', urgency: 'Routine Follow-up' },
        img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200'
    },
    'MB-8821': {
        phone: '+91 65432 10987',
        blood: 'O Negative',
        weightDisplay: { val: '76', trend: 'Stable', color: 'slate-400', icon: 'teal-50 text-teal-600' },
        bpDisplay: { val: '125/82', trend: 'Normal', color: 'slate-400', icon: 'rose-50 text-rose-500' },
        sugarDisplay: { val: '98', trend: 'Fasting', color: 'amber-600', icon: 'amber-50 text-amber-500' },
        heartRateDisplay: { val: '68' },
        diagnosis: { title: 'Lumbago with Sciatica', code: 'M54.41', type: 'Chronic', urgency: 'Physical Therapy' },
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
    },
    'MB-1129': {
        phone: '+91 54321 09876',
        blood: 'AB Positive',
        weightDisplay: { val: '55', trend: 'Stable', color: 'slate-400', icon: 'teal-50 text-teal-600' },
        bpDisplay: { val: '105/65', trend: 'Normal', color: 'slate-400', icon: 'rose-50 text-rose-500' },
        sugarDisplay: { val: '90', trend: 'Postprandial', color: 'success text-teal-600', icon: 'amber-50 text-amber-500' },
        heartRateDisplay: { val: '80' },
        diagnosis: { title: 'Migraine without aura', code: 'G43.009', type: 'Acute Episodic', urgency: 'Routine Follow-up' },
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
    },
    'MB-5567': {
        phone: '+91 43210 98765',
        blood: 'B Negative',
        weightDisplay: { val: '90', trend: '+0.5%', color: 'error text-red-500', icon: 'teal-50 text-teal-600' },
        bpDisplay: { val: '135/88', trend: 'Pre-Hypertension', color: 'amber-600', icon: 'rose-50 text-rose-500' },
        sugarDisplay: { val: '105', trend: 'Fasting', color: 'amber-600', icon: 'amber-50 text-amber-500' },
        heartRateDisplay: { val: '92' },
        diagnosis: { title: 'Bacterial Pneumonia', code: 'J18.9', type: 'Acute Infection', urgency: 'Immediate Observation' },
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
    }
  };

  const currentPatientMeta = patientsRaw.find(p => p.id === selectedPatient) || patientsRaw[0];
  const currentPatientExtra = fullPatientData[selectedPatient] || fullPatientData['MB-9281'];
  return (
    <div className="bg-background text-on-background antialiased overflow-hidden min-h-screen">
        {/* Persistent SideNavBar */}
        <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-slate-50 border-r border-slate-200/50 flex flex-col p-4 font-['Inter'] text-sm tracking-wide">
            <div className="mb-10 px-4">
                <h1 className="text-lg font-bold text-teal-700 tracking-tight">Medi Bridge</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">Clinical Portal</p>
            </div>
            <nav className="flex-1 space-y-1">
                <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                    to="/dashboard">
                    <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
                    Dashboard
                </Link>
                <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
                    to="/audit-history">
                    <span className="material-symbols-outlined" data-icon="fact_check" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
                    Audit History
                </Link>
                {/* Active State */}
                <Link className="flex items-center gap-3 px-4 py-3 bg-white text-teal-600 rounded-xl font-semibold shadow-sm"
                    to="/patient-history">
                    <span className="material-symbols-outlined" data-icon="history_edu"
                        style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                    Patient History
                </Link>
            </nav>
            <div className="mt-auto pt-4 border-t border-slate-200/50 space-y-1">
                <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    href="#">
                    <span className="material-symbols-outlined" data-icon="settings">settings</span>
                    Settings
                </a>
                <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    to="/">
                    <span className="material-symbols-outlined" data-icon="logout">logout</span>
                    Logout
                </Link>
            </div>
        </aside>
        {/* Main Content Canvas */}
        <main className="ml-64 min-h-screen flex flex-col relative">
            {/* TopAppBar */}
            <header
                className="fixed top-0 right-0 left-64 z-40 h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
                <div className="flex items-center gap-4">
                    <div className="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400 text-lg" data-icon="search">search</span>
                        <input className="bg-transparent border-none focus:ring-0 text-sm w-64 placeholder:text-slate-400"
                            placeholder="Search records..." type="text" />
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
                        <img alt="Medical Professional Profile"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-100"
                            data-alt="professional portrait of a middle-aged male doctor with a kind expression wearing a white coat and stethoscope"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvnEThOTf7Rfx1SSCNd3zNBSVAzbajexb_-GhdLgznfS9WMOc9zYf5D__moVAYJ2abIsnGxOFp-1eeoQPzd1-r3gEBrhqAzv2yasZa9z7-pY6h8i_7xSOImlAXXuW9T7NzgmXxqesB9BAnGoRUfAQxNkuyeRgrH605yJTYUvcXWASQQWw3DokvJOmW_1bdlGIyA7Pt62EjAKlSF_K7GOVCyPum7R8pdo1PtcaicoKkfVJoq7K1GI35TXFefL--S0CgqW3uM_V0Tn1F" />
                    </div>
                </div>
            </header>
            <div className="pt-16 flex h-[calc(100vh-64px)] overflow-hidden">
                {/* Patient List Sidebar */}
                <section className="w-80 bg-surface-container-low flex flex-col overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold tracking-tight text-on-surface">Active Patients</h2>
                            <span
                                className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">6
                                TOTAL</span>
                        </div>
                    </div>
                                        <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">
                        {patientsRaw.map(patient => (
                          <div key={patient.id} onClick={() => setSelectedPatient(patient.id)}
                              className={`p-4 rounded-xl cursor-pointer transition-all group ${selectedPatient === patient.id ? 'bg-surface-container-lowest shadow-sm border border-primary/10' : 'bg-transparent hover:bg-white'}`}>
                              <div className="flex items-center gap-3">
                                  <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${selectedPatient === patient.id ? 'bg-primary-container/20 text-primary' : 'bg-slate-200 text-slate-500'}`}>
                                      {patient.initials}</div>
                                  <div className="flex-1 min-w-0">
                                      <p className={`text-sm truncate ${selectedPatient === patient.id ? 'font-bold text-on-background' : 'font-medium text-slate-600 group-hover:text-on-background'}`}>
                                          {patient.name}</p>
                                      <p className="text-[10px] text-slate-500">ID: #{patient.id} • {patient.age}yo</p>
                                  </div>
                                  {selectedPatient === patient.id && <span className="material-symbols-outlined text-primary text-sm" data-icon="chevron_right">chevron_right</span>}
                              </div>
                              {selectedPatient === patient.id && <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                                  <span className="text-[10px] text-slate-400">Selected Contact: {currentPatientExtra.phone}</span>
                                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                              </div>}
                          </div>
                        ))}
                    </div>
                </section>
                {/* Detailed Selected View */}
                <section className="flex-1 overflow-y-auto no-scrollbar bg-background p-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Section 1: Personal Profile Hero */}
                        <div
                            className="relative bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)] flex items-end gap-8 overflow-hidden">
                            <div
                                className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full -mr-24 -mt-24 blur-3xl">
                            </div>
                            <div className="relative w-40 h-40 rounded-3xl overflow-hidden ring-4 ring-background shadow-lg">
                                <img alt={currentPatientMeta.name} className="w-full h-full object-cover" src={currentPatientExtra.img} />
                            </div>
                            <div className="relative flex-1 pb-2">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-4xl font-bold tracking-tight text-on-background leading-none">{currentPatientMeta.name}</h2>
                                        <p className="text-slate-500 mt-2 font-medium">Patient ID: {currentPatientMeta.id}-2024-X</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-slate-200 transition-colors">
                                            <span className="material-symbols-outlined text-slate-600"
                                                data-icon="edit">edit</span>
                                        </button>
                                        <button
                                            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-slate-200 transition-colors">
                                            <span className="material-symbols-outlined text-slate-600"
                                                data-icon="share">share</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-12">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Gender</p>
                                        <p className="text-sm font-semibold text-on-background">{currentPatientMeta.gender}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Age</p>
                                        <p className="text-sm font-semibold text-on-background">{currentPatientMeta.age} Years</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Height</p>
                                        <p className="text-sm font-semibold text-on-background">{currentPatientMeta.height}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Weight</p>
                                        <p className="text-sm font-semibold text-on-background">{currentPatientMeta.weight}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Blood</p>
                                        <p className="text-sm font-semibold text-primary">{currentPatientExtra.blood}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Section 2: Biological Data Bento Grid */}
                        <div className="grid grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <div
                                        className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                                        <span className="material-symbols-outlined"
                                            data-icon="monitor_weight">monitor_weight</span>
                                    </div>
                                    <span className={`text-[10px] font-bold ${currentPatientExtra.weightDisplay.color}`}>{currentPatientExtra.weightDisplay.trend}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Weight
                                    </p>
                                    <p className="text-2xl font-bold text-on-background">{currentPatientExtra.weightDisplay.val} <span
                                            className="text-xs font-medium text-slate-400">kg</span></p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <div
                                        className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                                        <span className="material-symbols-outlined" data-icon="blood_pressure"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>blood_pressure</span>
                                    </div>
                                    <span className={`text-[10px] font-bold ${currentPatientExtra.bpDisplay.color}`}>{currentPatientExtra.bpDisplay.trend}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Blood
                                        Pressure</p>
                                    <p className="text-2xl font-bold text-on-background">{currentPatientExtra.bpDisplay.val} <span
                                            className="text-xs font-medium text-slate-400">mmHg</span></p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <div
                                        className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                        <span className="material-symbols-outlined" data-icon="glucose">glucose</span>
                                    </div>
                                    <span className={`text-[10px] font-bold ${currentPatientExtra.sugarDisplay.color}`}>{currentPatientExtra.sugarDisplay.trend}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Sugar
                                        Level</p>
                                    <p className="text-2xl font-bold text-on-background">{currentPatientExtra.sugarDisplay.val} <span
                                            className="text-xs font-medium text-slate-400">mg/dL</span></p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <div
                                        className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
                                        <span className="material-symbols-outlined" data-icon="favorite"
                                            style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                    </div>
                                    <span className="material-symbols-outlined text-sky-500 animate-pulse text-xs"
                                        data-icon="pulse">pulse_alert</span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Heart
                                        Rate</p>
                                    <p className="text-2xl font-bold text-on-background">{currentPatientExtra.heartRateDisplay.val} <span
                                            className="text-xs font-medium text-slate-400">bpm</span></p>
                                </div>
                            </div>
                        </div>
                        {/* Section 3: Clinical Diagnosis & Symptoms */}
                        <div className="grid grid-cols-3 gap-6">
                            {/* Left: Diagnosis Details */}
                            <div className="col-span-2 space-y-6">
                                <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-sm">
                                    <h3 className="text-lg font-bold text-on-background mb-6 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary"
                                            data-icon="clinical_notes">clinical_notes</span>
                                        Clinical Diagnosis
                                    </h3>
                                    <div className="space-y-6">
                                        <div className="bg-surface-container-low p-4 rounded-2xl">
                                            <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">Primary
                                                Diagnosis</p>
                                            <p className="text-base font-semibold text-on-background leading-relaxed">{currentPatientExtra.diagnosis.title}</p>
                                            <div className="mt-4 flex gap-2">
                                                <span className="px-3 py-1 bg-white text-on-surface-variant text-[10px] font-bold rounded-full">ICD-10: {currentPatientExtra.diagnosis.code}</span>
                                                <span className="px-3 py-1 bg-white text-on-surface-variant text-[10px] font-bold rounded-full">{currentPatientExtra.diagnosis.type}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 border-l-4 border-primary bg-slate-50 rounded-r-xl">
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Next Review
                                                </p>
                                                <p className="text-sm font-bold text-on-background">November 15, 2023</p>
                                            </div>
                                            <div className="p-4 border-l-4 border-tertiary-container bg-slate-50 rounded-r-xl">
                                                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Urgency</p>
                                                <p className="text-sm font-bold text-on-background">{currentPatientExtra.diagnosis.urgency}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label
                                                className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Doctor's
                                                Symptoms Observation</label>
                                            <textarea
                                                className="w-full bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 p-4 text-sm placeholder:text-slate-400"
                                                placeholder="Enter patient symptoms and clinical observations..."
                                                rows="4"></textarea>
                                        </div>
                                        <div className="flex justify-end pt-2">
                                            <button
                                                className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm" data-icon="save">save</span>
                                                Update Case File
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Right: Quick Actions / Vitals History */}
                            <div className="col-span-1 space-y-6">
                                <div className="bg-white p-6 rounded-[1.5rem] shadow-sm">
                                    <h3 className="text-sm font-bold text-on-background mb-4 uppercase tracking-tight">Recent
                                        History</h3>
                                    <div className="space-y-4">
                                        <div className="flex gap-3 relative pb-4">
                                            <div className="absolute left-1.5 top-6 bottom-0 w-px bg-slate-100"></div>
                                            <div className="w-3 h-3 rounded-full bg-primary mt-1 z-10 ring-4 ring-primary/10">
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-on-background">Routine Checkup</p>
                                                <p className="text-[10px] text-slate-400">Oct 24, 2023 • Dr. Vance</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 relative pb-4">
                                            <div className="absolute left-1.5 top-6 bottom-0 w-px bg-slate-100"></div>
                                            <div className="w-3 h-3 rounded-full bg-slate-200 mt-1 z-10 ring-4 ring-white">
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-on-background">Lab Results Received</p>
                                                <p className="text-[10px] text-slate-400">Oct 12, 2023 • Hematology</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-3 h-3 rounded-full bg-slate-200 mt-1 z-10 ring-4 ring-white">
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-on-background">Initial Consultation</p>
                                                <p className="text-[10px] text-slate-400">Sep 30, 2023 • Dr. Aris</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="w-full mt-6 py-2 bg-surface-container-low text-primary text-[10px] font-bold rounded-full hover:bg-primary-container hover:text-white transition-all uppercase tracking-widest">View
                                        All Records</button>
                                </div>
                                <div className="bg-primary/5 p-6 rounded-[1.5rem] border border-primary/10">
                                    <h3 className="text-xs font-bold text-primary mb-3 uppercase tracking-tight">Prescriptions
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 bg-white/50 p-2 rounded-xl">
                                            <div
                                                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                                                <span className="material-symbols-outlined text-lg" data-icon="pill">pill</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-bold text-on-background truncate">Ventolin HFA
                                                </p>
                                                <p className="text-[9px] text-slate-500">90mcg inhaler</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white/50 p-2 rounded-xl">
                                            <div
                                                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                                                <span className="material-symbols-outlined text-lg"
                                                    data-icon="medical_services">medical_services</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-bold text-on-background truncate">Cetirizine HCl
                                                </p>
                                                <p className="text-[9px] text-slate-500">10mg daily</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="mt-4 text-xs font-semibold text-primary hover:underline">+ Add
                                        New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        {/* Contextual Floating Action Button */}
        <button
            className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
            <span className="material-symbols-outlined text-2xl" data-icon="add">add</span>
        </button>
    </div>
  );
}

export default PatientHistory;
