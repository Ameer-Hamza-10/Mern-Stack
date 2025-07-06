const User = require('../Models/user-model')
// const bcrypt = require('bcrypt')

// const bcrypt = require('bcrypt')
const Home = async (req, res) => {
    try {
        res.status(200).send('Welcome to Ameer Hamza using controllers')

    } catch (error) {
        console.log(error);

    }
}

const Registration = async (req, res, next) => {
    try {
        console.log(req.body);

        const { userName, userEmail, phone, password } = req.body;

        const userExist = await User.findOne({ userEmail });

        if (userExist) {
            return res.status(400).json({ message: 'email already exist' })
        }
        // const salt = 10;
        // const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({ userName, userEmail, phone, password });
        await newUser.save();

        res.status(200).json({
            msg: "User Created Successfully",
            token: await newUser.generateToken(),
            id: newUser._id.toString(),
        })
    } catch (err) {
        // res.status(500).json({ error: error.message })
        const extraDetails = { error: err.message }
        const status = 500;
        const error = {
            status,
            message: 'Registration Failed',
            extraDetails
        }
        next(error)

    }
}




const Login = async (req, res, next) => {
    try {
        const { userEmail, password } = req.body;
        const userExist = await User.findOne({ userEmail })
        if (!userExist) {
            return res.status(400).json({ message: 'invalid Credentials' });
        }

        const user = await userExist.comparePassword(password)
        if (user) {
            res.status(200).json({
                msg: "Login Successfull",
                token: await userExist.generateToken(),
                id: userExist._id.toString(),
            })

       
        } else {
            const error = {
                status: 401, // 🔁 use 401 (Unauthorized)
                message: 'Invalid email or password',
                extraDetails: 'Password does not match',
            };
            next(error); // 👈 send full error object
        }

    } catch (err) {
        const extraDetails = err.message
        const status = 500;
        const error = {
            status,
            message: 'invalid email or password',
            extraDetails
        }
        next(error)

    }
}

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData })


    } catch (error) {
        console.log(`error from the user root ${error.message}`);

    }
}




module.exports = { Home, Registration, Login, user }