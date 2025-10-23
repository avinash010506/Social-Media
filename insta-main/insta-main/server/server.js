const express = require("express")
const connectDB = require("./Connection")
const app =express()
const users = require("./route")
const cors = require("cors")
require("dotenv").config()
// var bodyParser = require('body-parser');
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(cors())
app.use('/api',users)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()