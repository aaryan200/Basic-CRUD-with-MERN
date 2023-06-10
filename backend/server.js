const express = require('express');
const app = express();
const mongoose = require('mongoose');
const studentRoute = require('./routes/students');
const mongoURL = require('./config');

mongoose.connect(mongoURL).then(console.log("Connected to MONGODB"));

app.use(express.json());

app.use('/api/students', studentRoute);

app.listen("5000", () => {
    console.log("Backend is running.");
});
