const User = require("../models/user_model");
const bcrypt = require("bcrypt")
const jwtProvider = require("../config/jwtProvider")

const createUser = async(userData)=>{
    try{
        let{firstName,lastName,email,password}=userData;
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            throw new Error("user already exist with email : ",email)
        }
        password = await bcrypt.hash(password,8);
        const user = await User.create({firstName,lastName,email,password})
        console.log("created user",user)
        return user
    }catch(error){
        throw new Error(error.message)
    }
}

const findUserId=async(userId) =>{
    try {
        const user = await User.findById(userId)
        // .populate("address")
        if(!user){
            throw new Error("user not found",userId)
        }
        return user
    } catch (error) {
        // throw new Error(error.message)
    }
}

const getUserEmail=async(email)=>{
    try {
        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            throw new Error("user not found with email",email)
        }
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}

const getUserProfileByToken=async(token)=>{
    try {
        const userId = jwtProvider.getUserIdFromToken(token)
        const user = await findUserId(userId)
        if(!user){
            throw new Error("user not found with email",userId)
        }
        return user
    } catch (error) {
        throw new Error(error.message)
    } 
}

const getAllUsers =async()=>{
    try {
        const users = await User.find();
        return users
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {createUser,findUserId,getUserEmail,getUserProfileByToken,getAllUsers}