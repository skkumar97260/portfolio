const About=require('../model/about');

exports.saveAbout = async (req, res) => {
    try {
        const about = new About(req.body);
        await about.save();
        res.status(200).json({ result: about, message: "About created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.getAbout = async (req, res) => {
    try {
        const about = await About.find();
        res.status(200).json({ result: about, message: "About fetched successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getsingleAbout = async (req, res) => {
    try {
        const about = await About.findById({ _id: req.query._id });
        res.status(200).json({ result: about, message: "About fetched successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updateAbout = async (req, res) => {
    try {
        const about = await About.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.status(200).json({ result: about, message: "About updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteAbout = async (req, res) => {
    try {
        const about = await About.findByIdAndDelete(req.query._id);
        res.status(200).json({ result: about, message: "About deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}