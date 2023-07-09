const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.post(
    "/",
    productController.createProduct
)

router.get(
    "/search/:pid",
    productController.seachProductById
)

router.delete(
    "/:pid",
    productController.deleteProductById
)

module.exports = router;