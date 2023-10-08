const userService = require("../services/user_services")
const jwtProvider = require("../config/jwtProvider")
const cartService = require("../services/cart_service")
const bcrypt = require("bcrypt")

const register = async(req,res)=>{
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id)
        await cartService.createCart(user)
        return res.status(200).send({jwt,message:"register success"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const login = async(req,res)=>{
    const {password,email}=req.body
    // console.log(email)
    try {
        const user = await userService.getUserEmail(email)
        if(!user){
            return res.status(404).send({message:"user not found with email : ,email"})
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).send({message:"invalid password"})
        }
        console.log("hello")
        const jwt = jwtProvider.generateToken(user._id)
        return res.status(200).send({jwt,message:"login success"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {register,login}