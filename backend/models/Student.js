const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    degree: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        requied: true,
    }
})
module.exports =  mongoose.model("Student", StudentSchema);