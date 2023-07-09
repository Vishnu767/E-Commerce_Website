const express = require('express');
const router = express.Router();
const bankAccountController = require('../controllers/bankAccount-controller');

router.post(
    "/",
    bankAccountController.createBankAccount
)

router.get(
    "/:uid",
    bankAccountController.getBankAccounts
)

router.delete(
    "/:aid",
    bankAccountController.deleteBankAccount
)

module.exports = router;