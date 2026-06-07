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
        let mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            console.log("No MONGO_URL found in environment. Initializing in-memory MongoDB server...");
            try {
                const { MongoMemoryServer } = require("mongodb-memory-server");
                const mongoServer = await MongoMemoryServer.create();
                mongoUrl = mongoServer.getUri();
                console.log(`In-memory MongoDB server started at: ${mongoUrl}`);
            } catch (err) {
                console.error("Failed to start in-memory MongoDB. Please specify a MONGO_URL in server/.env.", err);
                process.exit(1);
            }
        }
        await connectDB(mongoUrl)
        app.listen(port,console.log(`server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()