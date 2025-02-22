const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    profileImage: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: Number },
    otp: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
