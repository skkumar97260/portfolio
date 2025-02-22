const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Admin" },
    image: { type: String },
    description1: { type: String },
    description2: { type: String },
    skills: [{
        skill: { type: String },
        image: { type: String }
    }],
    resume: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});

const About = mongoose.model('About', aboutSchema);
module.exports = About;
