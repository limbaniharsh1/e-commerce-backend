const Review = require('../models/review_model')
const productService = require('../services/product_service')

async function createReview(reqData,user){
    const product = await productService.findProductById(reqData.productId)
    const review = new Review({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createdAt:new Data()
    })
    await product.save()
    return await review.save()
}

async function getAllReview(productId){
    const product = await productService.findProductById(reqData.productId)
    return await Review.find({product:productId}).populate("user")
}

module.exports = {createReview, getAllReview}