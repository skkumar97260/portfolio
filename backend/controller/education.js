const Education = require('../model/education');

exports.saveEducation = async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json({ result: education, message: "Education added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find();
        res.status(200).json({ result: education, message: "Education fetched successfully" });
    } catch (error) {    
        res.status(400).json({ message: error.message });
    }
}

exports.getSingleEducation = async (req, res) => {
    try {
        const education = await Education.findById({ _id: req.query._id });
        res.status(200).json({ result: education, message: "Education fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(200).json({ result: education, message: "Education updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteEducation = async (req, res) => {
    try {
        const education = await Education.findByIdAndDelete({ _id: req.query._id });
        res.status(200).json({ result: education, message: "Education deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}