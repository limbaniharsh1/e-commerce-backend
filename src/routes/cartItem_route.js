const express = require('express')
const router = express.Router()

const cartItemController = require("../controller/cartItem_controller")
const authenticate = require("../middleware/authenticate")

router.put("/:id",authenticate,cartItemController.updateCartItem)
router.delete("/:id",authenticate,cartItemController.removecartItem)

module.exports = router