const mongoose =require('mongoose');

const educationSchema = new mongoose.Schema({
_id:{type:mongoose.Types.ObjectId,required:true,auto:true},
userId:{type:mongoose.Types.ObjectId,ref:"Admin"},
education:{type:String},
academicPlace:{type:String},
academicName:{type:String},
academicYear:{type:String},
academicPercentage:{type:String},
isDeleted:{type:Boolean,default:false},
status:{type:Number,default:1},
createdOn:{type:Date,default:Date.now},
createdBy:{type:String},
modifiedOn:{type:Date},
modifiedBy:{type:String}
})
const Education = mongoose.model('Education', educationSchema);
module.exports = Education