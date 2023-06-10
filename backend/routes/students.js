const router = require('express').Router();
const Student = require('../models/Student');

// Create new student
router.post("/", async (req, res) => {
    const newStudent = new Student(req.body);
    try {
        const savedStudent = await newStudent.save();
        res.status(200).json(savedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update student data
router.put("/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const allStudents = await Student.find();
        res.status(200).json(allStudents);
    } catch(err) {
        res.status(500).json(err);
    }
})

// Delete a post
router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully...");
    } catch(err) {
        res.status(500).json(err);
    }
})

module.exports = router