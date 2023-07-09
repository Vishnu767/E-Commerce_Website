const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller-controller');

router.post(
    "/",
    sellerController.createSeller)

router.get(
    "/search/:email",
    sellerController.searchSeller)

router.get(
    "/:sid",
    sellerController.searchSellerById
    )

module.exports = router;
