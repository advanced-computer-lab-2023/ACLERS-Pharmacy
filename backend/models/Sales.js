const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    quantitySold: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
    , 
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = mongoose.model('Sales', SaleSchema);