const Certification = require('../model/certification');

exports.saveCertification = async (req, res) => {

    try {
        const certification = new Certification(req.body);
        await certification.save();
        res.status(200).json({ result: certification, message: "Certification saved successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getCertification = async (req, res) => {

    try {
        const certifications = await Certification.find();
        res.status(200).json({ result: certifications, message: "Certifications fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getsingleCertification = async (req, res) => {

    try {
        const certification = await Certification.findById({ _id: req.query._id });
        res.status(200).json({ result: certification, message: "Certification fetched successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateCertification = async (req, res) => {

    try {
        const certification = await Certification.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({ result: certification, message: "Certification updated successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteCertification = async (req, res) => {

    try {
        const certification = await Certification.findByIdAndDelete({ _id: req.query._id });
        res.status(200).json({ result: certification, message: "Certification deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}