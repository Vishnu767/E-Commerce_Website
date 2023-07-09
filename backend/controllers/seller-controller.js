const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Seller = require("../models/seller");

// Post request code to create a new object in the database
const createSeller = async (req, res, next) => {

    const { name, email } = req.body;

    const createdSeller = new Seller({
        name: name,
        email: email
    });

    console.log("createdSeller: (From seller-controller) ", createdSeller);

    try {
        await createdSeller.save();
    } catch (err) {
        const error = new HttpError(
            "Creating seller failed, please try again. (From seller-controller)",
            500
        );
        return next(error);
    }
    console.log("Saved seller! (From seller-controller)\n");
    res.status(201).json({ seller: createdSeller });
};

const searchSeller = async (req, res, next) => {
    const email = req.params.email;
    console.log("email: (From seller-controller) ", email);
    let requiredSeller = [];
    try {
        const requiredSeller = await Seller.find({ email: email })
        console.log("Seller Found: (From seller-controller) ", requiredSeller);
        res.send(requiredSeller);
    } catch (err) {
        console.error(err);
        res.send(requiredSeller);
    }
};

const searchSellerById = async (req, res, next) => {
    const sid = req.params.sid;
    try {
        const requiredSeller = await Seller.findById(sid);
        console.log("Found Seller by Id: (From seller-controller) ", requiredSeller);
        res.send(requiredSeller);
    } catch (err) {
        const error = new HttpError(
            "Searching seller by id failed, please try again. (From seller-controller)",
            500
        );
        return next(error);
    }
}

exports.createSeller = createSeller;
exports.searchSeller = searchSeller;
exports.searchSellerById = searchSellerById;