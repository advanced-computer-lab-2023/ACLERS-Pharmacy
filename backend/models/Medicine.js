const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    medicinalUse: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['archived', 'unarchived'],
        default: 'unarchived'
    },
   
});

module.exports = mongoose.model('Medicine', MedicineSchema);
