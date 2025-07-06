const jwt = require('jsonwebtoken')
const User = require('../Models/user-model')


const authMiddleware = async (req, res, next) => {

    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    const jwtToken = token.replace('Bearer', '').trim();

    console.log('token from auth middleware', jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET)
        const userData = await User.findOne({ userEmail: isVerified.userEmail }).select({ password: 0 })
        console.log('isVerified', userData);
        req.user = userData
        req.token = token
        req.userId = userData._id
        next()

    } catch (error) {
        console.log(error);

    }

}

module.exports = authMiddleware