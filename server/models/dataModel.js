const mongoose = require('mongoose');

const ActiveCrowdSchema = new mongoose.Schema({
    zoneId: {
        type: String,
        required: [true, 'Please add a zone ID']
    },
    currentDensity: {
        type: Number,
        default: 0
    },
    capacityLimit: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActiveCrowd', ActiveCrowdSchema);
