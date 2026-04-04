import mongoose from 'mongoose';

// Matches the 'ayurvedas' collection in MongoDB
// Fields: icd11_code, namaste_code, disease_name, long_definition
const ayurvedaSchema = new mongoose.Schema({
    icd11_code: {
        type: String,
    },
    namaste_code: {
        type: String,
    },
    disease_name: {
        type: String,
    },
    long_definition: {
        type: String,
    },
}, { collection: 'ayurvedas' });

const ayurvedaModel = mongoose.model('ayurvedas', ayurvedaSchema);

export default ayurvedaModel;
