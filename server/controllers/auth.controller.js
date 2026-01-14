const User = require("../models/User.model.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const multer = require("multer")
const {Email} = require('../utils/email.js')
const crypto = require('crypto')


exports.login=async(req, res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password)
            return res.status(401).json({success: false, error: "Field required!"});

        const user= await User.findOne({email});
        if(!user){
           return res.status(404).json({success:false, error: "User Not Found"});
        }
        else{
            const isMatch=await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).json({success: false, error: "Wrong Password"});
            }

            const token=jwt.sign({_id: user._id, role: user.role},
                process.env.JWT_KEY, {expiresIn: "1d"}
            );
            
            if(!token)
                return res.status(402).json({success: false, error: "Token not created."});

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000 // 1 days
              });
              
            res.status(200)
                .json({success: true,
                    token,
                    user: {_id: user._id, name: user.name, role: user.role}
            });
        }
    }
    catch(error){
        // console.log(error.message);
        return res.status(500).json({ success: false, error: "Login Server Error" });
    }
}

// const storage= multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, "public/uploads/");
//     },
//     filename: (req, file, cb)=>{
//         cb(null, Date.now()+path.extname(file.originalname));
//     }
// });

// export const upload=multer({storage: storage});

exports.registration=async (req, res)=>{
    try{
        const {name, email, password, phoneNumber, role}=req.body
        
        if(!password){
            return res.status(401).json({success: false, error: "Password required!"})
        }
        
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, error: "user allready exist with this email."});
        }
        
        const hashPass=await bcrypt.hash(password, 10);
        
        const newUser=new User({
            name,
            email,
            password: hashPass,
            phoneNumber,
            role,
            profileImage: req.file? req.file.filename : ""
            
        });

        const savedUser= await newUser.save();

        return res.status(202).json({success: true, message: "employee added successfully."});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "server error = require() registration"});
    }
}

exports.forgetPasswordVerification= async(req, res)=>{
    try{
        const {email}=req.body;
        
        const user=await User.findOne({email: email});
        if(!user){
            return res.status(404).json({success: false, error: "No user is registered with this email address."});
        }
        
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = Date.now() + 3600000; // 1 hour from now
        
        await User.updateOne(
            { _id: user._id },
            { $set: { resetToken: resetToken, resetTokenExpiry: tokenExpiry } }
        );
        
        const resetUrl = `https://localhost:3000/event-management-dashboard/reset-password?token=${resetToken}`
        
        const emailContent={
            to : email,
            subject : "Password Reset Request - Event Management Dashboard",
            html : `
            <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
            <h2>Hello ${user.name || 'there'},</h2>
            <p>We received a request to reset the password for your account.</p>
            <p>Click the button below to set a new password:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p style="margin-top: 20px; font-size: 0.8em; color: #777;">
            This link will expire in 60 minutes for security reasons.<br>
            If you didn't request this change, you can safely ignore this email.
            </p>
            </div>
            `
        }
        Email(emailContent);
        
        return res.status(200).json({success: true, message: "Check your registered email for reset the password!"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "Server Error!"});
    }
}

exports.forgetPassword= async(req, res)=>{
    try{
        const {email, newPassword }=req.body;
        
        const user=await User.findOne({email: email});
        if(!user){
            return res.status(404).json({success: false, error: "User not found!"});
        }
        
        const hashPassword=await bcrypt.hash(newPassword, 10);
        const newUser= await User.findByIdAndUpdate(user._id, {password: hashPassword});

        return res.status(200).json({success: true, message: "Password Updated"});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "Forget Password sever error."});
    }
}