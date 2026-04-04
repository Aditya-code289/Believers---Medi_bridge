import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Pateint", 
        required: true,
        unique: true
    },
    events: [
        {
            title: { type: String, required: true },
            desc: { type: String, required: true },
            changes: { type: String }, // e.g., 'tier_3 -> tier_4'
            color: { type: String, default: 'teal' }, // teal, blue, amber
            author: { type: String, default: 'System' },
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const auditModel = mongoose.model("Audit", auditSchema);
export default auditModel;
