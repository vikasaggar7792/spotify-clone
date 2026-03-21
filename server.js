const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DATABASE CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/spotifyClone")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});