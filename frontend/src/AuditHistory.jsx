import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AuditHistory() {
  const [selectedPatient, setSelectedPatient] = useState('MB-9281');

  const patients = [
    { id: 'MB-9281', name: 'Priya Sharma', initials: 'PS', age: 28, color: 'bg-primary-container/20 text-primary', lastVisit: 'Oct 24, 2023', active: true },
    { id: 'MB-4412', name: 'Rahul Desai', initials: 'RD', age: 45, color: 'bg-slate-200 text-slate-500', active: false },
    { id: 'MB-3019', name: 'Ananya Patel', initials: 'AP', age: 32, color: 'bg-slate-200 text-slate-500', active: false },
    { id: 'MB-8821', name: 'Vikram Singh', initials: 'VS', age: 51, color: 'bg-slate-200 text-slate-500', active: false },
    { id: 'MB-1129', name: 'Kavya Iyer', initials: 'KI', age: 24, color: 'bg-slate-200 text-slate-500', active: false },
    { id: 'MB-5567', name: 'Rohan Verma', initials: 'RV', age: 39, color: 'bg-slate-200 text-slate-500', active: false },
  ];

  const auditData = {
    'MB-9281': {
      symptoms: '"Patient presents with wheezing, shortness of breath, and chest tightness over the past 48 hours. Reports exacerbation post-exposure to dust and pollution in New Delhi. No fever. Slight persistent dry cough during night time."',
      systemOptions: [
        { match: '92%', code: 'J45.909', desc: 'Unspecified asthma, uncomplicated' },
        { match: '85%', code: 'J45.21', desc: 'Mild intermittent asthma with (acute) exacerbation', selected: true, note: '"Patient has documented history of intermittent asthma, presenting an acute phase reaction. J45.909 lacks specificity for exacerbation."' },
        { match: '65%', code: 'J30.1', desc: 'Allergic rhinitis due to pollen' }
      ],
      events: [
        { time: 'Today, 2:15 PM', title: 'Insurance Co. Revision', desc: 'Billing tier adjusted by Star Health for J45.21 code justification.', changes: 'tier_3 -> tier_4_acute', color: 'amber' },
        { time: 'Today, 10:42 AM', title: 'Admin Metadata Update', desc: 'Clinical admin updated patient encounter timeframe to reflect actual admission.', changes: 'time_in: 09:15 -> 09:05', color: 'blue' },
        { time: 'Today, 09:20 AM', title: 'Physician Finalized Record', desc: 'Dr. Vance signed off on clinical notes and diagnostic mapping.', changes: null, color: 'teal' }
      ]
    },
    'MB-4412': {
      symptoms: '"Patient reports sudden onset of severe chest pain, radiating to the left arm and jaw. Experiencing profuse sweating and nausea. History of hypertension and high cholesterol."',
      systemOptions: [
        { match: '96%', code: 'I21.9', desc: 'Acute myocardial infarction, unspecified', selected: true, note: '"Classic presentation of STEMI. Immediate intervention required."' },
        { match: '70%', code: 'R07.9', desc: 'Chest pain, unspecified' },
        { match: '50%', code: 'K21.9', desc: 'Gastro-esophageal reflux disease without esophagitis' }
      ],
      events: [
        { time: 'Yesterday, 11:30 PM', title: 'Emergency Triage Trigger', desc: 'Patient flagged for immediate cardiac evaluation.', changes: 'status: waiting -> emergent', color: 'amber' },
        { time: 'Yesterday, 11:45 PM', title: 'Provider Addendum', desc: 'Dr. Nair updated ECG results mapping to primary chart.', changes: 'ecg_status: pending -> uploaded', color: 'blue' }
      ]
    },
    'MB-3019': {
      symptoms: '"Patient complains of frequent urination, excessive thirst, and unexplained weight loss over the past 3 months. Fatigue is prominent."',
      systemOptions: [
        { match: '94%', code: 'E11.9', desc: 'Type 2 diabetes mellitus without complications', selected: true, note: '"HbA1c levels confirm diagnosis. Prescribing Metformin."' },
        { match: '80%', code: 'E10.9', desc: 'Type 1 diabetes mellitus without complications' },
        { match: '60%', code: 'E89.1', desc: 'Postprocedural hypoinsulinemia' }
      ],
      events: [
        { time: 'Today, 09:00 AM', title: 'Lab Integration', desc: 'HbA1c results synced successfully from Metropolis Labs API.', changes: 'hba1c: null -> 8.2%', color: 'blue' },
        { time: 'Today, 09:15 AM', title: 'Prescription Issued', desc: 'E-prescription for Metformin 500mg sent to Apollo Pharmacy.', changes: null, color: 'teal' }
      ]
    },
    'MB-8821': {
      symptoms: '"Patient presents with chronic severe lower back pain radiating down the right leg, worsened by sitting. Onset insidious over several months."',
      systemOptions: [
        { match: '88%', code: 'M54.41', desc: 'Lumbago with sciatica, right side' },
        { match: '85%', code: 'M51.26', desc: 'Other intervertebral disc displacement, lumbar region', selected: true, note: '"MRI confirms L4-L5 disc herniation compressing the nerve root. M54.41 is just symptomatic description."' },
        { match: '60%', code: 'M54.5', desc: 'Low back pain' }
      ],
      events: [
        { time: 'Today, 03:00 PM', title: 'Radiology Update', desc: 'MRI Lumbar spine report attached to record.', changes: 'imaging: ordered -> resulted', color: 'blue' },
        { time: 'Today, 04:30 PM', title: 'Physician Finalized Record', desc: 'Dr. Vance endorsed MRI findings and referred to physiotherapy.', changes: null, color: 'teal' }
      ]
    },
    'MB-1129': {
      symptoms: '"Patient presents with episodic migraines, localized to the right hemisphere, accompanied by photophobia and nausea. Episodes last 12-24 hours."',
      systemOptions: [
        { match: '95%', code: 'G43.009', desc: 'Migraine without aura, not intractable, without status migrainosus', selected: true, note: '"Patient presentation perfectly matches G43.009 classification."' },
        { match: '80%', code: 'G43.109', desc: 'Migraine with aura, not intractable' },
        { match: '70%', code: 'G44.209', desc: 'Tension-type headache, unspecified' }
      ],
      events: [
        { time: 'Yesterday, 10:00 AM', title: 'Intake Assessment', desc: 'Nurse recorded initial history and vitals.', changes: 'status: scheduled -> checked_in', color: 'blue' },
        { time: 'Yesterday, 10:45 AM', title: 'Physician Finalized Record', desc: 'Diagnosis registered, acute migraine abortive therapy prescribed.', changes: null, color: 'teal' }
      ]
    },
    'MB-5567': {
      symptoms: '"Patient experiencing high fever (102F), chills, and a productive cough with greenish sputum. Reports feeling increasingly fatigued for 5 days."',
      systemOptions: [
        { match: '92%', code: 'J18.9', desc: 'Pneumonia, unspecified organism', selected: true, note: '"Symptoms and lung auscultation strongly suggestive of bacterial pneumonia."' },
        { match: '85%', code: 'J06.9', desc: 'Acute upper respiratory infection, unspecified' },
        { match: '75%', code: 'J40', desc: 'Bronchitis, not specified as acute or chronic' }
      ],
      events: [
        { time: 'Today, 08:30 AM', title: 'Vitals Alert', desc: 'System flagged elevated temperature for immediate review.', changes: 'fever_flag: false -> true', color: 'amber' },
        { time: 'Today, 09:45 AM', title: 'Physician Finalized Record', desc: 'Treatment plan established, CBC and chest X-ray ordered.', changes: null, color: 'teal' }
      ]
    }
  };

  const currentAudit = auditData[selectedPatient] || auditData['MB-9281'];

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
          {/* Active State */}
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
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
              <div className="text-right">
                <p className="text-xs font-bold text-on-background dark:text-slate-200">Dr. Julian Vance</p>
                <p className="text-[10px] text-slate-500">Chief of Cardiology</p>
              </div>
              <img alt="Doctor Profile" className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-100 dark:ring-teal-900" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvnEThOTf7Rfx1SSCNd3zNBSVAzbajexb_-GhdLgznfS9WMOc9zYf5D__moVAYJ2abIsnGxOFp-1eeoQPzd1-r3gEBrhqAzv2yasZa9z7-pY6h8i_7xSOImlAXXuW9T7NzgmXxqesB9BAnGoRUfAQxNkuyeRgrH605yJTYUvcXWASQQWw3DokvJOmW_1bdlGIyA7Pt62EjAKlSF_K7GOVCyPum7R8pdo1PtcaicoKkfVJoq7K1GI35TXFefL--S0CgqW3uM_V0Tn1F" />
            </div>
          </div>
        </header>

        <div className="pt-16 flex h-[calc(100vh-64px)] overflow-hidden">
          {/* Patient List Sidebar */}
          <section className="w-80 bg-surface-container-low dark:bg-slate-900/50 flex flex-col overflow-hidden border-r border-slate-200/50 dark:border-slate-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold tracking-tight text-on-surface dark:text-slate-200">Recent Audits</h2>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 text-[10px] font-bold rounded-full">6 TOTAL</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all group ${selectedPatient === patient.id
                    ? 'bg-white dark:bg-slate-800 shadow-sm border border-teal-500/20'
                    : 'bg-transparent hover:bg-white/60 dark:hover:bg-slate-800/50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${selectedPatient === patient.id ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}>
                      {patient.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate ${selectedPatient === patient.id ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                        {patient.name}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">ID: #{patient.id} • {patient.age}yo</p>
                    </div>
                    {selectedPatient === patient.id && (
                      <span className="material-symbols-outlined text-teal-500 text-sm" data-icon="chevron_right">chevron_right</span>
                    )}
                  </div>
                  {patient.active && selectedPatient === patient.id && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400">Last visited: {patient.lastVisit}</span>
                      <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Audit View */}
          <section className="flex-1 overflow-y-auto no-scrollbar bg-slate-50/50 dark:bg-slate-950 p-8">
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Audit Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">gavel</span>
                    Clinical Audit Trail
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Patient ID: {selectedPatient} — Showing complete historical and metadata modifications.</p>
                </div>
                <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export PDF
                </button>
              </div>

              {/* Alert: Manual Override Detected */}

              {/* Alert: Manual Override Detected */}
              {currentAudit.systemOptions.find(o => o.selected && o.match !== currentAudit.systemOptions[0].match) && (
                <div className="bg-error-container/20 border-l-4 border-error p-5 rounded-r-2xl flex gap-4 items-start shadow-sm mix-blend-multiply dark:mix-blend-normal dark:bg-red-900/10">
                  <span className="material-symbols-outlined text-error mt-0.5">warning</span>
                  <div>
                    <h3 className="text-sm font-bold text-error">Manual Override Detected</h3>
                    <p className="text-xs text-error/80 mt-1 font-medium leading-relaxed">
                      The attending physician manually selected a diagnosis code that differed from the top recommended Clinical Option. This action was logged to ensure preventative mistreatment tracking and compliance.
                    </p>
                  </div>
                </div>
              )}


              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left side: Clinical Interactions */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Doctor Prompts */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">record_voice_over</span>
                      Symptoms Prompted by Physician
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic border border-slate-100 dark:border-slate-800">
                      {currentAudit.symptoms}
                    </div>
                  </div>

                  {/* Generated Options vs Selected */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 text-sm">list_alt</span>
                      System Generated Options
                    </h3>
                    <div className="space-y-4">
                      {/* Option 1 */}
                      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 opacity-60">
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded text-slate-600 dark:text-slate-400">92% Match</span>
                          <span className="text-[10px] font-bold text-slate-400">J45.909</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Unspecified asthma, uncomplicated</p>
                      </div>

                      {/* Option 2 (Selected but Overridden manually) */}
                      <div className="border-2 border-teal-500 bg-teal-50/30 dark:bg-teal-900/10 rounded-xl p-4 relative shadow-sm">
                        <div className="absolute -top-3 -right-3 bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                          <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 bg-teal-100 dark:bg-teal-900/50 text-[10px] font-bold rounded text-teal-800 dark:text-teal-300">Physician Override Selected</span>
                          <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 tracking-wider">J45.21</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Mild intermittent asthma with (acute) exacerbation</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                          <strong>Physician note:</strong> "Patient has documented history of intermittent asthma, presenting an acute phase reaction. J45.909 lacks specificity for exacerbation."
                        </p>
                      </div>

                      {/* Option 3 */}
                      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 opacity-40">
                        <div className="flex justify-between items-start mb-2">
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded text-slate-600 dark:text-slate-400">65% Match</span>
                          <span className="text-[10px] font-bold text-slate-400">J30.1</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Allergic rhinitis due to pollen</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Admin & Insurance Minute Changes */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-full">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-500 text-sm">manage_search</span>
                      Admin & Provider Modifications
                    </h3>


                    <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8 pb-4">
                      {currentAudit.events.map((ev, i) => (
                        <div key={i} className="relative pl-6">
                          <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 ${ev.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/50' :
                            ev.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/50' :
                              'bg-teal-100 dark:bg-teal-900/50'}`}>
                            <span className={`w-2 h-2 rounded-full ${ev.color === 'amber' ? 'bg-amber-500' :
                              ev.color === 'blue' ? 'bg-blue-500' :
                                'bg-teal-500'
                              }`}></span>
                          </span>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ev.time}</span>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{ev.title}</p>
                            <p className="text-xs text-slate-500">{ev.desc}</p>
                            {ev.changes && (
                              <div className="mt-2 bg-slate-50 dark:bg-slate-800 p-2 rounded text-[10px] font-mono text-slate-600 dark:text-slate-400">
                                {ev.changes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AuditHistory;
