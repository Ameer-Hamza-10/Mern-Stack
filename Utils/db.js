const mongoose = require('mongoose')

// const URI = 'mongodb://127.0.0.1:27017/mern_series';
const URI = process.env.MONGODB_URI;



const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("🔗 URI from db.js:", URI);  // Check if URI really passed to mongoose

        console.log('✅ Connection successful to Database');

    } catch (error) {
        console.log('❌ Database connection failed:', error.message);
        process.exit(0)

    }
}
module.exports = connectDB