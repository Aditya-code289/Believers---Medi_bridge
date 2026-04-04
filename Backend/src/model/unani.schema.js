import mongoose from 'mongoose';

// Matches the 'unanis' collection in MongoDB
// Fields: namec_code, short_defination, long_defination
const unaniSchema = new mongoose.Schema({
    namec_code: {
        type: String,
    },
    short_defination: {
        type: String,
    },
    long_defination: {
        type: String,
    },
}, { collection: 'unanis' });

const unaniModel = mongoose.model('unanis', unaniSchema);

export default unaniModel;
