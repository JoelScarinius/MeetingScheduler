const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const env = require("dotenv");
env.config({ path: "./.env" });
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const meetingRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/userRoutes");
const { DB_USER, DB_PASSWORD, SERVER_PORT, CLIENT_PORT } = process.env;

const PORT = SERVER_PORT || 5000;

// Connect to the MongoDB database using Mongoose
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@meetingapp.9r6ez1j.mongodb.net/OnlineMeetingSchedulingAppDB?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB is connected successfully \n"))
    .catch((err) => console.error(err));

// Start the Express server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Configure CORS middleware to allow cross-origin requests from the client
app.use(
    cors({
        origin: [`http://localhost:${CLIENT_PORT}`],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Enable CORS for specific origin (http://localhost:3000) and allow credentials
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        `http://localhost:${CLIENT_PORT}`
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    next();
});

app.use(cookieParser());

app.use(express.json());

// Mount routes for authentication, meeting handling, and user
app.use("/", authRoute);
app.use("/", meetingRoute);
app.use("/", userRoute);
