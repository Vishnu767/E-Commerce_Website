const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const sellerProduct = require("../models/sellerProduct");

const createSellerProduct = async(req, res, next) => {
    const { sellerId, productId, productStatus } = req.body;

    const createdSellerProduct = new sellerProduct({
        sellerId: sellerId,
        productId: productId,
        productStatus: productStatus
    });

    console.log("createdSellerProduct: (From seller-products controller) ", createdSellerProduct);

    try {
        await createdSellerProduct.save();
    } catch (err) {
        const error = new HttpError(
            "Creating sellerProduct failed, please try again. (From seller-products controller) ",
            500
        );
        return next(error);
    }
    console.log("Saved sellerProduct! (From seller-products controller)\n");
    res.status(201).json({ sellerProduct: createdSellerProduct });
}

const getSellerProducts = async(req, res, next) => {
    const sellerId = req.params.sid;
    let sellerProducts;
    try {
        sellerProducts = await sellerProduct.find({sellerId: sellerId});
        console.log(sellerProducts);
        res.send(sellerProducts);
    } catch (err) {
        const error = new HttpError(
            "Fetching sellerProducts failed, please try again later. (From seller-products controller)",
            500
        );
        return next(error);
    }
}

const DeleteSellerProduct = async(req, res, next) => {
    const productId = req.params.pid;
    try {
        await sellerProduct.findOneAndRemove({productId: productId});
    } catch (err) {
        const error = new HttpError(
            "Deleting sellerProduct failed, please try again later. (From seller-products controller)",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Deleted Product. (From seller-products controller)" });
}

const getAllSellerProducts = async (req, res, next) => {
    let allSellerProducts;
    try {
        allSellerProducts = await sellerProduct.find({__v: 0});
        console.log("All SellerProducts: (From seller-products controller) ", allSellerProducts);
        res.send(allSellerProducts);
    } catch (err) {
        const error = new HttpError(
            "Couldn't get all sellerProducts failed, please try again later. (From seller-products controller)",
            500
        );
        return next(error);
    }
}

exports.createSellerProduct = createSellerProduct;
exports.getSellerProducts = getSellerProducts;
exports.DeleteSellerProduct = DeleteSellerProduct;
exports.getAllSellerProducts = getAllSellerProducts;