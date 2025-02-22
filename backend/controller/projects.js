const Projects=require('../model/projects');


exports.saveProjects = async (req, res) => {
    try {
        const projects = new Projects(req.body);
        await projects.save();
        res.status(201).json({ result: projects, message: "Project created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Projects.find();
        res.status(200).json({ result: projects, message: "Projects fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getsingleProjects = async (req, res) => {
    try {
        const projects = await Projects.findById({ _id: req.query._id });
        res.status(200).json({ result: projects, message: "Projects fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateProjects = async (req, res) => {
    try {
        const projects = await Projects.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(200).json({ result: projects, message: "Projects updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteProjects = async (req, res) => {
    try {
        const projects = await Projects.findByIdAndDelete(req.query._id);
        res.status(200).json({ result: projects, message: "Projects deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}