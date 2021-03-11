const mongoose = require('mongoose');

// Create your User Model

const adSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

const shopperSchema = new mongoose.Schema({
    name: String,
    email: String,
    // cohort: String,
    avatar: String,
    ads: [adSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Shopper', shopperSchema);