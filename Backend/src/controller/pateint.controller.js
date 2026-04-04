import patientModel from "../model/pateint.schema.js";
import auditModel from "../model/audit.schema.js";

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
