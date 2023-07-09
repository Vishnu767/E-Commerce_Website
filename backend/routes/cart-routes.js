const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart-controller');

router.post(
    "/",
    cartController.addProductToCart
)

router.post(
    "/check-product", 
    cartController.checkProductInCart)

router.get(
    "/:uid",
    cartController.getCartByUserId
)

router.patch(
    "/",
    cartController.updateCart
)

router.delete(
    "/:uid/:pid",
    cartController.deleteItemFromCart
)


module.exports = router;