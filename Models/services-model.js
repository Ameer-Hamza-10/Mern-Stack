const mongoose = require('mongoose')


const serviceSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})


const Service = new mongoose.model('Service', serviceSchema)

module.exports = Service