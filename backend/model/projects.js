const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Admin" },
    title: { type: String },
    image: { type: String },
    role: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});
const Projects = mongoose.model('Projects', projectsSchema);
module.exports = Projects;
