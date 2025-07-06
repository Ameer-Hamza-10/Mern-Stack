const Service = require('../Models/services-model')



const services = async (req, res) => {
    try {
        const responce = await Service.find();
        if (!responce) {
            res.status(401).json({ msg: 'No service found' })
            return
        }
        res.status(200).json({ responce })
    } catch (error) {
        console.log(`Services: ${error}`);

    }
}

module.exports = services