const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  role: { type: String, default: "user" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phoneNumber: { type: String },
  password:{type:String,required:true},
  profileImage: {type: String},
  createAt : {type: Date, default: Date.now},
  updateAt : {type : Date, default: Date.now},
  resetToken : {type: String, default : null},
  resetTokenExpiry : {type: Date, default : null},
}, { timestamps: true });

exports = mongoose.model("User", userSchema);
