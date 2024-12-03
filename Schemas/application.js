const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    applyDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the 'User' collection
        required: [true, 'Client ID is required'],
    },
    offer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobListing', // Refers to the 'JobListing' collection
        required: [true, 'Job listing ID is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Application', applicationSchema);
