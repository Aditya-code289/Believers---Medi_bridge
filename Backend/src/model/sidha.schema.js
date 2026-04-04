import mongoose from 'mongoose';

// Matches the 'sidhas' collection in MongoDB
// Fields: namec_code, short_defination, long_defination
const sidhaSchema = new mongoose.Schema({
    namec_code: {
        type: String,
    },
    short_defination: {
        type: String,
    },
    long_defination: {
        type: String,
    },
}, { collection: 'sidhas' });

const sidhaModel = mongoose.model('sidhas', sidhaSchema);

export default sidhaModel;
