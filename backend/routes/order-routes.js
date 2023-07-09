const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order-controller');

router.get(
    "/:uid",
    orderController.getOrders
)

router.patch(
    "/update-status", 
    orderController.updateStatus
)

router.patch(
    "/",
    orderController.updatePath
)

module.exports = router;