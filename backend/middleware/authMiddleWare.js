import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

export const  protectRoute = asyncHandler( async(req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
try {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id).select('-password')
    next()

} catch (error) {
    console.error()
    res.status(401)
    throw new Error("Not authorized, Token failed")
}
    }

    if(!token){
        res.status(401);
        throw new Error('Not Authorized, No Token')
    }
}) 