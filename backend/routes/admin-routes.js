const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin-controller');

router.post(
    "/create-admin",
    adminController.createAdmin
)

router.post(
    "/verify-admin",
    adminController.verifyAdmin
)

module.exports = router;