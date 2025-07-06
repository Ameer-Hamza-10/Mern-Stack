const express = require('express');
const router = express.Router();
const contactFormHandler = require('../Controllers/contact-controller'); // this is the function itself

router.route('/contact').post(contactFormHandler.ContactForm); // ✅ call directly as function

module.exports = router;
