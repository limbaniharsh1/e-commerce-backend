const express = require('express')
const router = express.Router()

const productController = require("../controller/product_controller")
const authenticate = require("../middleware/authenticate")
const Product = require('../models/product_model')

router.get("/",authenticate,productController.getAllProducts)
router.get("/id/:id",authenticate,productController.findProductById)
router.get("/pr",async(req,res)=>{
    let data = await Product.find()
    res.send(data)
})

module.exports = router