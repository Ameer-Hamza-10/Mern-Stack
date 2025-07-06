const mongoose = require('mongoose'); // full mongoose import karo

const contactSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const Contact = mongoose.model('Contact', contactSchema); // ✅ This is correct

module.exports = Contact;
