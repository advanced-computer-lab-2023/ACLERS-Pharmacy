const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Patient = require('../models/Patient')
//const Doctor = require('../models/Doctor')
const blacklistedTokens = require('./blackListedTokens');
const Applicant = require('../models/Applicant');
const Pharmacist = require('../models/Pharmacist')
const Admin = require('../models/Admin')
const protect = asyncHandler(async (req,res,next)=>{
let token 
let user
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
     token = req.headers.authorization.split(' ')[1]
     if (blacklistedTokens.includes(token)) {
        return res.status(401).json({ message: 'Token is blacklisted' });
    }
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(decoded.role == "patient"){
         user = await Patient.findById(decoded.id)
     
        
     }else if (decoded.role=="pharmacist"){
        user = await Pharmacist.findById(decoded.id)
     }
     else if (decoded.role=="applicant"){
        user = await Applicant.findById(decoded.id)

     }else if(decoded.role == "admin"){
        user = await Admin.findById(decoded.id)
     }

     
     req.user = user
     console.log(req.user)
     req.role = decoded.role
     

     next()
    }catch(error){
        console.log(error)
        res.status(401)
        throw new Error('not authorized')

    }
}
if(!token){
    res.status(401)
    throw new Error('no token')
}
})
function checkRole(role) {
    return (req, res, next) => {
        const userRole = req.role;
         console.log(userRole)

        if (userRole === role) {
            // User has the required role, allow access to the route
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    };
}
module.exports ={protect,checkRole}