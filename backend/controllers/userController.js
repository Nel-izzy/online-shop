import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const authUser =  asyncHandler(async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))){

    const {_id, name, email, isAdmin} = user

    res.json({
        _id,
        name,
        email,
        isAdmin,
        token: generateToken(_id)
    })

  }else{
    res.status(401)
    throw new Error('Invalid Username or Password')
  }
  })

  export const getUserProfile = asyncHandler( async(req, res) => {
      const user = await User.findById(req.user._id)
      if(user){
        const {_id, name, email, isAdmin} = user

        res.json({
            _id,
            name,
            email,
            isAdmin,

        })
      }else{
        res.status(404)
        throw new Error('User not found')
      }
    })

    export const registerUser = asyncHandler( async(req, res) => {
      const {email, password, name} = req.body

      const existingUser = await User.findOne({email})
      if(existingUser){
        res.status(400)
        throw new Error('User already Exists')
      }else{
       const user = await User.create({
        email, name, 
        password
       })

       if(user){
        const {_id, name, email, isAdmin} = user

        res.status(201).json({
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(_id)   
        })
      }else{
        res.status(400)
        throw new Error('Invalid User Data')
      }
      }
    })