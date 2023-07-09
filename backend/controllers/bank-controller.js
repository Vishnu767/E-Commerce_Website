const HttpError = require("../models/http-error");
const Bank = require("../models/bank");

// Add bank
const addBank = async(req, res, next) => {
    const { name } = req.body;
    const createdBank = new Bank({
        name: name
    });

    console.log("createdBank: (From bank-controller)", createdBank);

    try {
        await createdBank.save();
    } catch (err) {
        console.error("THIS IS ERROR: ",err);
        const error = new HttpError(
            "Adding bank failed, please try again. (From bank-controller)",
            500
        );
        return next(error);
    }
    console.log("Added bank! (From bank-controller)\n");
    res.status(201).json({ bank: createdBank });
};

exports.addBank = addBank;