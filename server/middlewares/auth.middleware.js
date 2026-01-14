const jwt = require('jsonwebtoken')
const UserActivation = require('../models/User.model.js')

const verifyUser=async(req, res, next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).json({success: false, error: "token not provide"})
        }

        const decode=jwt.verify(token, process.env.JWT_KEY);
        if(!decode){
            return res.status(404).json({success: false, error: "token not valid!"})
        }

        const user = await UserActivation.findById(decode._id).select("-password");
        if(!user){
            return res.status(404).json({success: false, error: "User not found"})
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: "Middleware Server Error"});
    }
}

module.exports.verify =(req, res)=>{
    return res.status(200).json({success: true, user: req.user})
}

module.exports = verifyUser;