const express = require('express');
const router = express.Router();
const sellerProductController = require('../controllers/sellerProduct-controller');

router.post(
    "/",
    sellerProductController.createSellerProduct
)

router.get(
    "/all",
    sellerProductController.getAllSellerProducts
)

router.get(
    "/search/:sid",
    sellerProductController.getSellerProducts
)

router.delete(
    "/:pid",
    sellerProductController.DeleteSellerProduct
)

module.exports = router;