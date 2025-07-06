// Controllers/contact-controller.js
const contact = require('../Models/contact-model');

const ContactForm = async (req, res, next) => {
    try {
        const response = req.body;
        await contact.create(response);
        return res.status(200).json({ msg: "Contact Form Submitted Successfully" });
    } catch (error) {
        return res.status(500).json({
            message: 'Contact Form Submission Failed',
        });
    }
};

module.exports = {
    ContactForm
};
