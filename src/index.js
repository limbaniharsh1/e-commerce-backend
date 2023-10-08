const express = require("express");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to e-commerce api",status:true})
})

const authRouters = require("./routes/auth_route")
app.use("/auth",authRouters)

const userRouters = require("./routes/user_route")
app.use("/api/users",userRouters)

const productRouter = require("./routes/product_routes")
app.use("/api/products",productRouter)

const adminProductRouter = require("./routes/adminProduct_route")
app.use("/api/admin/products",adminProductRouter)

const cartRouter = require("./routes/cart_route")
app.use("/api/cart",cartRouter)

const cartItemRouter = require("./routes/cartItem_route")
app.use("/api/cart_items",cartItemRouter)

const orderRouter = require("./routes/order_routes")
app.use("/api/orders",orderRouter)

const adminOrderRouter = require("./routes/adminOrder_route")
app.use("/api/admin/orders",adminOrderRouter)

const reviewRouter = require("./routes/review_routes")
app.use("/api/reviews",reviewRouter)

const ratingRouter = require("./routes/rating_routes")
app.use("/api/ratings",ratingRouter)

module.exports = app