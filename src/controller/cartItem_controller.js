const cartItemService = require("../services/cartitem_service")

const updateCartItem=async(req,res)=>{
    const user = req.user
    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id,req.params.id,req.body)
        return res.status(200).send(updatedCartItem)
    } catch (error) {
        return res.staus(500).send({error:error.message})
    }
}

const removecartItem=async(req,res)=>{
    const user = req.user
    try {
        await cartItemService.removeCartItem(user._id,req.params.id)
        return res.status(200).send({message:"cartitem removed successfully"})
    } catch (error) {
        return res.staus(500).send({error:error.message})
    }
}

module.exports = {updateCartItem, removecartItem}