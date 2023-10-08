const Cart = require("../models/cart_model");
const CartItem = require("../models/cartitem_model");
const Product = require("../models/product_model");

async function createCart(user){
    console.log({user})
    try {
        const cart = new Cart({user})
        const createCart = await cart.save()
        return createCart;
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findUserCart(userid){
    try {
        let cart = await Cart.findOne({user:userid})
        let cartItems = await CartItem.find({cart:cart.id}).populate("product")
        cart.cartItem=cartItems
        let totalPrice = 0
        let totalDiscountedPrice = 0
        let totalItem = 0
        
        for(let cartItem of cart.cartItem){
            totalPrice += cartItem.price
            totalDiscountedPrice += cartItem.discountedPrice
            totalItem += cartItem.quantity
        }

         cart.totalPrice = totalPrice
         cart.totalDiscountedPrice = totalDiscountedPrice
         cart.totalItem = totalPrice - totalDiscountedPrice

         return cart
    } catch (error) {
        throw new Error(error.message)
    }
}

async function addCartItem(userId,req){
    const cart = await Cart.findOne({user:userId})
    if(cart == null){
        createCart(userId)    
    }
    try {
        const product = await Product.findById(req.productId)
        const isPresent = await CartItem.findOne({cart:cart._id,product:product._id,userId})
        if(!isPresent){
            const cartItem = new CartItem({
                product:product._id,
                cart:cart._id,
                quantity:1,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice
            })
            const createdCartItem =await cartItem.save()
            cart.cartItem.push(createdCartItem)
            await cart.save()
            return "item added to cart"
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {createCart,findUserCart,addCartItem}