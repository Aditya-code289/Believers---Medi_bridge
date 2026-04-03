const fs = require('fs');

const auditPath = './src/AuditHistory.jsx';
const patientPath = './src/PatientHistory.jsx';

let auditCode = fs.readFileSync(auditPath, 'utf8');

const updatedPatients = `
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
        { match: '85%', code: 'J45.21', desc: 'Mild intermittent asthma with (acute) exacerbation', selected: true, note: '"Patient has documented history of intermittent asthma, presenting an acute phase reaction. J45.909 lacks specificity for exacerbation."'},
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
        { match: '85%', code: 'M51.26', desc: 'Other intervertebral disc displacement, lumbar region', selected: true, note: '"MRI confirms L4-L5 disc herniation compressing the nerve root. M54.41 is just symptomatic description."'},
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

  const currentAudit = auditData[selectedPatient] || auditData["MB-9281"];
`;

auditCode = auditCode.replace(/const patients = \[[\\s\\S]*?\];/, updatedPatients);

auditCode = auditCode.replace(
  /<div className="bg-slate-50 dark:bg-slate-800\/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic border border-slate-100 dark:border-slate-800">\s*"Patient presents with wheezing[^<]*<\/div>/i,
  `<div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic border border-slate-100 dark:border-slate-800">
                      {currentAudit.symptoms}
                    </div>`
);

auditCode = auditCode.replace(/<div className="space-y-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\/\* Right side: /, `
                    <div className="space-y-4">
                      {currentAudit.systemOptions.map((opt, i) => (
                        <div key={i} className={opt.selected ? 'border-2 border-teal-500 bg-teal-50/30 dark:bg-teal-900/10 rounded-xl p-4 relative shadow-sm' : 'border border-slate-200 dark:border-slate-700 rounded-xl p-4 opacity-60'}>
                          {opt.selected && (
                            <div className="absolute -top-3 -right-3 bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                              <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                          )}
                          <div className="flex justify-between items-start mb-2">
                            <span className={\`px-2 py-1 text-[10px] font-bold rounded \${opt.selected ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}\`}>
                              {opt.selected ? 'Physician Override Selected' : \`\${opt.match} Match\`}
                            </span>
                            <span className={\`text-[10px] font-bold \${opt.selected ? 'text-teal-700 dark:text-teal-400 tracking-wider' : 'text-slate-400'}\`}>{opt.code}</span>
                          </div>
                          <p className={\`text-sm font-bold \${opt.selected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}\`}>{opt.desc}</p>
                          {opt.selected && opt.note && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                              <strong>Physician note:</strong> {opt.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: `);

auditCode = auditCode.replace(/<div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8 pb-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, `
                    <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8 pb-4">
                      {currentAudit.events.map((ev, i) => (
                        <div key={i} className="relative pl-6">
                          <span className={\`absolute -left-[9px] top-1 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 \${
                            ev.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/50' : 
                            ev.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/50' : 
                            'bg-teal-100 dark:bg-teal-900/50'}\`}>
                            <span className={\`w-2 h-2 rounded-full \${
                              ev.color === 'amber' ? 'bg-amber-500' :
                              ev.color === 'blue' ? 'bg-blue-500' :
                              'bg-teal-500'
                            }\`}></span>
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
          </section>`);

const overrideLogic = `
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
`;

auditCode = auditCode.replace(/<div className="bg-error-container\/20 border-l-4 border-error p-5 rounded-r-2xl flex gap-4 items-start shadow-sm mix-blend-multiply dark:mix-blend-normal dark:bg-red-900\/10">[\s\S]*?<\/div>\s*<\/div>/, overrideLogic);

fs.writeFileSync(auditPath, auditCode);

// --- Patient History ---

let patientCode = fs.readFileSync(patientPath, 'utf8');

const patientLogicHeader = `import React, { useState } from 'react';
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
`;

patientCode = patientCode.replace(/import React from 'react';\nimport { Link } from 'react-router-dom';\n\nfunction PatientHistory\(\) {\n/, patientLogicHeader);

const sidebarListRender = `                    <div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">
                        {patientsRaw.map(patient => (
                          <div key={patient.id} onClick={() => setSelectedPatient(patient.id)}
                              className={\`p-4 rounded-xl cursor-pointer transition-all group \${selectedPatient === patient.id ? 'bg-surface-container-lowest shadow-sm border border-primary/10' : 'bg-transparent hover:bg-white'}\`}>
                              <div className="flex items-center gap-3">
                                  <div
                                      className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold \${selectedPatient === patient.id ? 'bg-primary-container/20 text-primary' : 'bg-slate-200 text-slate-500'}\`}>
                                      {patient.initials}</div>
                                  <div className="flex-1 min-w-0">
                                      <p className={\`text-sm truncate \${selectedPatient === patient.id ? 'font-bold text-on-background' : 'font-medium text-slate-600 group-hover:text-on-background'}\`}>
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
                </section>`;

patientCode = patientCode.replace(/<div className="flex-1 overflow-y-auto no-scrollbar px-4 space-y-2 pb-6">[\s\S]*?<\/section>/, sidebarListRender);

// Replace the Profile string constants
patientCode = patientCode.replace(/<img alt="Sarah Hoskins" className="w-full h-full object-cover"[^>]*src="[^"]*"\s*\/>/, `<img alt={currentPatientMeta.name} className="w-full h-full object-cover" src={currentPatientExtra.img} />`);
patientCode = patientCode.replace(/<h2 className="text-4xl font-bold tracking-tight text-on-background leading-none">Sarah *\n* *Hoskins<\/h2>/, `<h2 className="text-4xl font-bold tracking-tight text-on-background leading-none">{currentPatientMeta.name}</h2>`);
patientCode = patientCode.replace(/<p className="text-slate-500 mt-2 font-medium">Patient ID: MB-9281-2024-X<\/p>/, `<p className="text-slate-500 mt-2 font-medium">Patient ID: {currentPatientMeta.id}-2024-X</p>`);

// Replace bio data
patientCode = patientCode.replace(/<p className="text-sm font-semibold text-on-background">Female<\/p>/, `<p className="text-sm font-semibold text-on-background">{currentPatientMeta.gender}</p>`);
patientCode = patientCode.replace(/<p className="text-sm font-semibold text-on-background">28 Years<\/p>/, `<p className="text-sm font-semibold text-on-background">{currentPatientMeta.age} Years</p>`);
patientCode = patientCode.replace(/<p className="text-sm font-semibold text-on-background">165 cm<\/p>/, `<p className="text-sm font-semibold text-on-background">{currentPatientMeta.height}</p>`);
patientCode = patientCode.replace(/<p className="text-sm font-semibold text-on-background">62 kg<\/p>/, `<p className="text-sm font-semibold text-on-background">{currentPatientMeta.weight}</p>`);
patientCode = patientCode.replace(/<p className="text-sm font-semibold text-primary">O Positive<\/p>/, `<p className="text-sm font-semibold text-primary">{currentPatientExtra.blood}</p>`);

patientCode = patientCode.replace(/<span className="text-\[10px\] font-bold text-success text-teal-600">\+1\.2%<\/span>/, `<span className={\`text-[10px] font-bold \${currentPatientExtra.weightDisplay.color}\`}>{currentPatientExtra.weightDisplay.trend}</span>`);
patientCode = patientCode.replace(/<p className="text-2xl font-bold text-on-background">62 <span/, `<p className="text-2xl font-bold text-on-background">{currentPatientExtra.weightDisplay.val} <span`);

patientCode = patientCode.replace(/<span className="text-\[10px\] font-bold text-slate-400">Normal<\/span>/, `<span className={\`text-[10px] font-bold \${currentPatientExtra.bpDisplay.color}\`}>{currentPatientExtra.bpDisplay.trend}</span>`);
patientCode = patientCode.replace(/<p className="text-2xl font-bold text-on-background">120\/80 <span/, `<p className="text-2xl font-bold text-on-background">{currentPatientExtra.bpDisplay.val} <span`);

patientCode = patientCode.replace(/<span className="text-\[10px\] font-bold text-amber-600">Fasting<\/span>/, `<span className={\`text-[10px] font-bold \${currentPatientExtra.sugarDisplay.color}\`}>{currentPatientExtra.sugarDisplay.trend}</span>`);
patientCode = patientCode.replace(/<p className="text-2xl font-bold text-on-background">95 <span/, `<p className="text-2xl font-bold text-on-background">{currentPatientExtra.sugarDisplay.val} <span`);

patientCode = patientCode.replace(/<p className="text-2xl font-bold text-on-background">72 <span/, `<p className="text-2xl font-bold text-on-background">{currentPatientExtra.heartRateDisplay.val} <span`);

patientCode = patientCode.replace(/<p className="text-base font-semibold text-on-background leading-relaxed">Mild\s*Persistent Asthma with Allergic Rhinitis<\/p>/, `<p className="text-base font-semibold text-on-background leading-relaxed">{currentPatientExtra.diagnosis.title}</p>`);
patientCode = patientCode.replace(/<span\s*className="px-3 py-1 bg-white text-on-surface-variant text-\[10px\] font-bold rounded-full">ICD-10:\s*J45\.30<\/span>/, `<span className="px-3 py-1 bg-white text-on-surface-variant text-[10px] font-bold rounded-full">ICD-10: {currentPatientExtra.diagnosis.code}</span>`);
patientCode = patientCode.replace(/<span\s*className="px-3 py-1 bg-white text-on-surface-variant text-\[10px\] font-bold rounded-full">Acute\s*Phase<\/span>/, `<span className="px-3 py-1 bg-white text-on-surface-variant text-[10px] font-bold rounded-full">{currentPatientExtra.diagnosis.type}</span>`);
patientCode = patientCode.replace(/<p className="text-sm font-bold text-on-background">Moderate Follow-up<\/p>/, `<p className="text-sm font-bold text-on-background">{currentPatientExtra.diagnosis.urgency}</p>`);

fs.writeFileSync(patientPath, patientCode);
console.log("SUCCESS!");
