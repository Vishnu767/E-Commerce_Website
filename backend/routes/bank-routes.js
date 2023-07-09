const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank-controller');

router.post(
    "/",
    bankController.addBank
)

module.exports = router;