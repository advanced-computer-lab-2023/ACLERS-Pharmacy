const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { urlencoded } = require('body-parser')
const port = process.env.PORT 
const path = require("path");
const cors = require('cors'); // Import the cors package


// Enable CORS for all routes







connectDB()

const app = express()
app.use(cors());

app.use(express.json())
//app.use(express.urlencoded({extended : false}))

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/auth',require('./routes/authRoutes'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/admin',require('./routes/adminRoutes'))
app.use('/patient',require('./routes/patientRoutes'))
app.use('/pharmacist',require('./routes/pharmacistRoutes'))
app.listen(port,()=> console.log('server started on port '+port))
