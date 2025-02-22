const Experience = require('../model/experience');

exports.saveExperience = async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(201).json({ result: experience, message: "Experience added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getExperience = async (req, res) => {
    try {
        const experience = await Experience.find();
        res.status(200).json({ result: experience, message: "Experience fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getsingleExperience = async (req, res) => {
    try {
        const experience = await Experience.findById({ _id: req.query._id });
        res.status(200).json({ result: experience, message: "Experience fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate( req.body._id , req.body, { new: true });
        res.status(200).json({ result: experience, message: "Experience updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(  req.query._id );
        res.status(200).json({ result: experience, message: "Experience deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}