import patientModel from "../model/pateint.schema.js";
import auditModel from "../model/audit.schema.js";
import puppeteer from "puppeteer";
import userModel from "../model/user.schema.js";

async function logAuditEvent(patientId, title, desc, color = 'teal', changes = null) {
    try {
        await auditModel.findOneAndUpdate(
            { patientId },
            { $push: { events: { title, desc, color, changes } } },
            { upsert: true, new: true }
        );
    } catch (e) {
        console.error("Failed to log audit event:", e);
    }
}

export async function get_pateint(req, res) {
    try {
        const patients = await patientModel.find({});
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// PATCH /api/pateint/update-diagnosis/:id
// Body: { icdDiagnosis?: [...], traditionalMedicine?: [...] }
export async function updateDiagnosis(req, res) {
    try {
        const { id } = req.params;
        const { icdDiagnosis, traditionalMedicine, searchQuery } = req.body;

        const updateFields = {};

        if (icdDiagnosis !== undefined) {
            updateFields.icdDiagnosis = icdDiagnosis;
        }
        if (traditionalMedicine !== undefined) {
            updateFields.traditionalMedicine = traditionalMedicine;
        }
        if (searchQuery !== undefined) {
            updateFields.searchQuery = searchQuery;
        }
        if (req.body.aiSummary !== undefined) {
            updateFields.aiSummary = req.body.aiSummary;
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const updated = await patientModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Log the audit event
        let auditTitle = "Diagnosis Updated";
        let auditDesc = "Patient clinical options were modified.";
        let color = "blue";

        if (icdDiagnosis && traditionalMedicine) {
            auditTitle = "Physician Finalized Record";
            auditDesc = "Dr. Vance signed off on clinical notes and diagnostic mapping.";
            color = "teal";
        } else if (searchQuery) {
            auditTitle = "Physicist Started Search";
            auditDesc = `Search triggered for: "${searchQuery}"`;
            color = "teal";
        } else if (req.body.aiSummary === "") {
            auditTitle = "Record Reset";
            auditDesc = "Diagnosis and AI summary were cleared from the patient record.";
            color = "amber";
        }

        await logAuditEvent(id, auditTitle, auditDesc, color);

        return res.status(200).json({
            message: "Diagnosis updated successfully",
            patient: updated,
        });

    } catch (error) {
        console.error("Error updating diagnosis:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function generateSummary(req, res) {
    try {
        const { id } = req.params;
        const patient = await patientModel.findById(id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        if (!patient.icdDiagnosis || patient.icdDiagnosis.length === 0) {
            return res.status(400).json({ message: "No ICD Diagnosis found to summarize." });
        }

        const icdList = patient.icdDiagnosis.map(i => `${i.code}: ${i.name}`).join('; ');
        const medList = (patient.traditionalMedicine || []).map(m => `${m.system.toUpperCase()} [${m.namec_code}]: ${m.short_defination}`).join('; ');

        const prompt = `You are an expert clinician. A patient has the following conditions:

ICD-11 Diagnoses: ${icdList}
Suggested Traditional Therapies: ${medList || 'None specified'}

Generate a **structured clinical summary** in strict Markdown format.

Follow this EXACT structure and DO NOT write paragraphs anywhere:

**Clinical Assessment:**
- [bullet point]
- [bullet point]

**Primary Concerns:**
- [bullet point]
- [bullet point]

**Holistic Treatment Plan:**
- [bullet point]
- [bullet point]

**Lifestyle Recommendations:**
- [bullet point]
- [bullet point]

**Precautions & Warnings:**
- [bullet point]
- [bullet point]

**Follow-up Plan:**
- [bullet point]
- [bullet point]

STRICT RULES — you MUST follow all of these without exception:
1. Every single point MUST be a bullet using "- "
2. NEVER write paragraphs or narrative text — not even one sentence outside a bullet
3. NEVER use filler phrases like "Here is", "Certainly", "As an expert"
4. Each bullet must be SHORT — maximum 10 words per bullet
5. Each section must have a maximum of 4 bullets — no more
6. Bold only the section headings, nothing else
7. Total response must not exceed 200 words
8. Leave one blank line between each section
9. Be clinical and direct — no explanations, no elaboration`;

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.grokapikey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!groqRes.ok) {
            const errBody = await groqRes.text();
            console.error("Groq ERROR", errBody);
            return res.status(500).json({ message: "Failed to generate AI summary", error: errBody });
        }

        const data = await groqRes.json();
        const aiSummary = data.choices[0].message.content;

        // Save to patient
        patient.aiSummary = aiSummary;
        await patient.save();

        // Log that AI Summary was generated
        await logAuditEvent(id, "LLM Assessment Generated", "Automated clinical assessment was generated and appended to the patient record.", "blue");

        return res.status(200).json({ message: "Summary generated", aiSummary });

    } catch (error) {
        console.error("Error generating AI summary:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function generatePdf(req, res) {
    try {
        const { id } = req.params;
        const patient = await patientModel.findById(id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        // Retrieve Doctor Details if possible - we can use an arbitrary context or query dummy.
        // Assuming the AI Summary is markdown, we format the bold asterisks and lists minimally.
        let summaryHtml = '<p>No clinical assessment available</p>';
        if (patient.aiSummary) {
            summaryHtml = patient.aiSummary
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>')
                .replace(/\n\n/g, '<br/>')
                .replace(/\n/g, '');
        }

        const icdListHtml = patient.icdDiagnosis?.map(i => `<li><strong>${i.code}</strong>: ${i.name}</li>`).join('') || '<li>None</li>';
        const medListHtml = patient.traditionalMedicine?.map(m => `<li><strong>${m.system.toUpperCase()} [${m.namec_code}]</strong>: ${m.short_defination}</li>`).join('') || '<li>None</li>';

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                .header { text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { color: #0f766e; margin: 0; font-size: 28px; }
                .header p { margin: 5px 0 0; color: #64748b; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; }
                
                .section { margin-bottom: 30px; }
                .section-title { font-size: 14px; font-weight: bold; color: #0d9488; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; }
                
                .pat-info { display: flex; flex-wrap: wrap; gap: 20px; background: #f8fafc; padding: 20px; border-radius: 8px; }
                .info-block { flex: 1; min-width: 150px; }
                .info-label { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; }
                .info-value { font-size: 16px; font-weight: bold; color: #0f172a; margin: 0; }
                
                .vitals-grid { display: flex; gap: 15px; margin-bottom: 20px; }
                .vital-box { flex: 1; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; }
                .vital-val { font-size: 20px; font-weight: bold; color: #0f172a; }
                .vital-unit { font-size: 12px; color: #64748b; }
                
                ul { padding-left: 20px; margin: 0; }
                li { margin-bottom: 6px; font-size: 14px; }
                
                .ai-summary { background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; }
                .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Medi Bridge Clinical Report</h1>
                <p>Confidential Medical Assessment</p>
                <p style="font-size: 12px; margin-top: 10px; color: #94a3b8;">Generated on: ${new Date().toLocaleDateString()}</p>
            </div>

            <div class="section">
                <div class="section-title">Patient Profile</div>
                <div class="pat-info">
                    <div class="info-block"><div class="info-label">Name</div><div class="info-value">${patient.username}</div></div>
                    <div class="info-block"><div class="info-label">Patient ID</div><div class="info-value">${patient._id}</div></div>
                    <div class="info-block"><div class="info-label">Age / Gender</div><div class="info-value">${patient.age} yrs, ${patient.gender}</div></div>
                    <div class="info-block"><div class="info-label">Blood Type</div><div class="info-value">${patient.bloodGroup}</div></div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Current Vitals</div>
                <div class="vitals-grid">
                    <div class="vital-box"><div class="info-label">Heart Rate</div><div class="vital-val">${patient.heartRate} <span class="vital-unit">bpm</span></div></div>
                    <div class="vital-box"><div class="info-label">Blood Pressure</div><div class="vital-val">${patient.bloodPressure} <span class="vital-unit">mmHg</span></div></div>
                    <div class="vital-box"><div class="info-label">Weight</div><div class="vital-val">${patient.weight} <span class="vital-unit">kg</span></div></div>
                    <div class="vital-box"><div class="info-label">Sugar Level</div><div class="vital-val">${patient.sugarLevel} <span class="vital-unit">mg/dL</span></div></div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Diagnosis & Mapping</div>
                <div style="margin-bottom: 15px;">
                    <div class="info-label text-teal-600 mb-1">ICD-11 Official Codes</div>
                    <ul>${icdListHtml}</ul>
                </div>
                <div>
                    <div class="info-label text-amber-600 mb-1">Traditional Medicine Protocols</div>
                    <ul>${medListHtml}</ul>
                </div>
            </div>

            <div class="section">
                <div class="section-title" style="color: #3b82f6;">AI Clinical Assessment Summary</div>
                <div class="ai-summary">
                    ${summaryHtml}
                </div>
            </div>

            <div class="footer">
                <p>This document is generated automatically by Medi Bridge AI Clinical Assist.</p>
                <p>Physician review required. Not for independent diagnostic use.</p>
            </div>
        </body>
        </html>
        `;

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        });
        
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
        });
        
        await browser.close();

        // Convert Uint8Array to Buffer for sending safely
        const buffer = Buffer.from(pdfBuffer);
        
        // Log audit event for document download
        await logAuditEvent(id, "Clinical Record Exported", "Patient history PDF was generated and downloaded.", "indigo");

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="MediBridge_Report_${patient.username.replace(/\\s+/g, '_')}.pdf"`,
            'Content-Length': buffer.length
        });

        res.end(buffer);

    } catch (error) {
        console.error("Error generating PDF:", error);
        return res.status(500).json({ message: "Failed to generate PDF document" });
    }
}
