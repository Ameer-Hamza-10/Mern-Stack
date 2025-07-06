const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})


userSchema.pre('save', async function (next) {
    console.log('🧠 Pre-save middleware is running...');
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        console.log('🔐 Hashed Password:', hashedPassword);

        user.password = hashedPassword;

        next();
    } catch (error) {
        console.log('❌ Error while hashing:', error);
        next(error);
    }
});


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            id: this._id.toString(),
            userEmail: this.userEmail,
            isAdmin: this.isAdmin,

        }, process.env.JWT_SECRET, { expiresIn: '30d' })
    } catch (error) {
        console.log(error);

    }
}
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema)


module.exports = User;