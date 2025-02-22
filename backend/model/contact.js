const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    userId: { type: mongoose.Types.ObjectId, ref: "Admin" },
    name: { type: String },
    email: { type: String },
    age: { type: Number },
    gender: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    languages: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
