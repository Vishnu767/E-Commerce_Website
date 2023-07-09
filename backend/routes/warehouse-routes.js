const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse-controller');

router.post(
    "/",
    warehouseController.createWarehouse
)

module.exports = router;