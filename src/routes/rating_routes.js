const express = require('express')
const router = express.Router()

const ratingController = require("../controller/rating_controller")
const authenticate = require("../middleware/authenticate")

router.post("/create",authenticate,ratingController.createRating)
router.put("/product/:productId",authenticate,ratingController.getAllRatings)

module.exports = router