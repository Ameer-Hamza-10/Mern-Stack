require("dotenv").config({ path: require('path').resolve(__dirname, '.env') });
console.log("🔍 URI from env:", process.env.MONGODB_URI);
const express = require('express')
const cors = require('cors')
const app = express()
const auth_Route = require('./Router/auth-route')
const contact_Route = require('./Router/contact-route')
const connectDB = require('./Utils/db');
const errorMiddleware = require("./Middlewares/error-middleware");
const service_router = require("./Router/service-route");
const admin_route = require('./Router/admin-route')


const corsOptions = {
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/auth', auth_Route)
app.use('/api/form', contact_Route)
app.use('/api', service_router)
app.use('/api/admin', admin_route)

app.use(errorMiddleware)



const PORT = process.env.PORT || 1000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);

    })
})
