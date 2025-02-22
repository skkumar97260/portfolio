const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Admin" },
    image: { type: String },
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    caption: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});
const Intro = mongoose.model('Intro', introSchema);
module.exports = Intro;
