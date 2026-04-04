import auditModel from "../model/audit.schema.js";

// GET /api/audit/:id
// Get the audit timeline for a specific patient
export async function getAuditHistory(req, res) {
    try {
        const { id } = req.params;
        const auditRecord = await auditModel.findOne({ patientId: id });
        
        if (!auditRecord) {
            // Return an empty events array so frontend doesn't crash
            return res.status(200).json({ events: [] });
        }

        // Return the events sorted by timestamp descending
        const sortedEvents = auditRecord.events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return res.status(200).json({ events: sortedEvents });
    } catch (error) {
        console.error("Error fetching audit history:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
