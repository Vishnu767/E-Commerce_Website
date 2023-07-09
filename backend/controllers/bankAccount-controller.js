const HttpError = require("../models/http-error");
const bankAccount = require("../models/bankAccounts");
const bank = require("../models/bank");
const user = require("../models/user");

const createBankAccount = async(req, res, next) => {
    const { userId, bankName, accountNumber } = req.body;

    // Generate a random number from 1000 to 20000
    const balance = Math.floor(Math.random() * 19000) + 1000;

    const createdBankAccount = new bankAccount({
        userId: userId,
        bankName: bankName,
        accountNumber: accountNumber,
        balance: balance
    });

    console.log("createdBankAccount: (From bank-account controller) ", createdBankAccount);

    try {
        await createdBankAccount.save();
    } catch (err) {
        const error = new HttpError(
            "Creating bankAccount failed, please try again. (From bank-account controller) ",
            500
        );
        return next(error);
    }


    console.log("Saved bankAccount! (From bank-account controller)\n");
    res.status(201).json({ bankAccount: createdBankAccount });
}

const getBankAccounts = async(req, res, next) => {
    let bankAccounts;
    const userId = req.params.uid;
    console.log("userId: (From bankAccount-controller) ", userId);
    try {
        bankAccounts = await bankAccount.find({ userId: userId });
    } catch (err) {
        const error = new HttpError(
            "Fetching bankAccounts failed, please try again later. (From bankAccount-controller) ",
            500
        );
        return next(error);
    }

    let bankDetails = [];
    console.log("BANK ACCOUNTS: (From bankAccount-controller) ", bankAccounts);

    for(let i=0; i<bankAccounts.length; i++){
        try{
            bankDetails.push({
                bankName: bankAccounts[i].bankName,
                accountNumber: bankAccounts[i].accountNumber,
                balance: bankAccounts[i].balance
            });
        }catch(err){
            const error = new HttpError(
                "Fetching bankAccounts failed, please try again later. (From bankAccount-controller) ",
                500
            );
            return next(error);
        }
    }
    console.log(bankDetails);
    res.send(bankDetails);

}

const deleteBankAccount = async(req, res, next) => {
    const accountNumber = req.params.aid;
    console.log("accountNumber: (From bankAccount-controller) ", accountNumber);
    try{
        await bankAccount.findOneAndRemove({accountNumber: accountNumber});
    } catch (err) {
        const error = new HttpError(
            "Deleting bankAccount failed, please try again later. (From bankAccount-controller) ",
            500
        );
        return next(error);
    }
    res.status(200).json({ message: "Deleted bankAccount. (From bankAccount-controller) " });
}


exports.createBankAccount = createBankAccount;
exports.getBankAccounts = getBankAccounts;
exports.deleteBankAccount = deleteBankAccount;