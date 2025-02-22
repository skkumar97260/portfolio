const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Admin" },
    year: { type: String },
    company: { type: String },
    role: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});
const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
