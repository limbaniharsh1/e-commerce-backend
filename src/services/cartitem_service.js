const CartItem = require("../models/cartitem_model")
const userService = require("../services/user_services")

async function updateCartItem(userId,cartItemId,cartItemData){
    try {
        const item = await findCartById(cartItemId)
        if(!item){
            throw new Error("cart item not found : ",cartItemId)
        }
        const user = await userService.findUserId(item.userId)
        if(!user){
            throw new Error("user not found : ",userId)
        }
        if(user._id.toString() === userId.toString()){
            item.quantity = cartItemData.quantity
            item.price = item.quantity*item.product.price
            item.discountedPrice = item.quantity*item.product.discountedPrice
        }
        else{
            throw new Error("you cant't update this cart item")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

async function removeCartItem(userId,cartItemId){
    const cartItem = await findCartItemById(cartItemId)
    const user = await userService.findUserId(userId)
    if(user._id.toString()===cartItem.userId.toString()){
        await CartItem.findByIdAndDelete(cartItemId)
    }
    throw new Error("you can't remove another user's item")
}

async function findCartItemById(cartItemId){
    const cartItem = await findCartItemById(cartItemId)
    if(cartItem){
        return cartItem
    }else{
        throw new Error("cartitem not found with id ",cartItemId)
    }
}

module.exports={updateCartItem,removeCartItem,findCartItemById}