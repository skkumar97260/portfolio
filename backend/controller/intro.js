const Intro=require('../model/intro');

exports.saveIntro = async (req, res) => {

    try {
        const intro = new Intro(req.body);
        await intro.save();
        res.status(200).json({ result: intro, message: "Intro created successfully" });      
       }
      catch (error) {
        res.status(400).json({ message: error.message });
      }
}

exports.getIntro = async (req, res) => {

    try {
        const intro = await Intro.find();
        res.status(200).json({ result: intro, message: "Intro fetched successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getsingleIntro = async (req, res) => {

    try {   
        const intro = await Intro.findById({ _id: req.query._id });
        res.status(200).json({ result: intro, message: "Intro fetched successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateIntro = async (req, res) => {

    try {
        const intro = await Intro.findByIdAndUpdate(req.body._id, req.body);
        res.status(200).json({ result: intro, message: "Intro updated successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteIntro = async (req, res) => {

    try {
        const intro = await Intro.findByIdAndDelete(req.query._id);
        res.status(200).json({ result: intro, message: "Intro deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}