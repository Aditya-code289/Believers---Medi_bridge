import patientModel from "../model/pateint.schema.js";

export async function get_pateint(req,res){
    try {
        const patients = await patientModel.find({});
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}