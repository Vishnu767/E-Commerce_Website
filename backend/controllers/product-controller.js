const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Product = require("../models/product");

// Create new product
const createProduct = async(req, res, next) => {
    const { name, quantity, description, price } = req.body;
    const createdProduct = new Product({
        name: name,
        quantity: quantity,
        description: description,
        price: price
    });

    console.log("createdProduct: (From product-controller)", createdProduct);

    try {
        await createdProduct.save();
    } catch (err) {
        const error = new HttpError(
            "Creating product failed, please try again. (From product-controller)",
            500
        );
        return next(error);
    }
    console.log("Saved product! (From product-controller)\n");
    res.status(201).json({ product: createdProduct });
};

const seachProductById = async(req, res, next) => {
    const pid = req.params.pid;
    try {
        requiredProduct = await Product.findById(pid);
        console.log("Required Product: (From product-controller) ", requiredProduct);
        res.send(requiredProduct);
    } catch (err) {
        const error = new HttpError(
            "Couldn't find product, please try again. (From product-controller)",
            500
        );
        return next(error);
    }
}

const deleteProductById = async(req, res, next) => {
    const pid = req.params.pid;
    try {
        await Product.findByIdAndDelete(pid);
        res.send("Product Deleted Successfully (From product-controller)");
    } catch (err) {
        const error = new HttpError(
            "Couldn't find product, please try again. (From product-controller)",
            500
        );
        return next(error);
    }
}

exports.createProduct = createProduct;
exports.seachProductById = seachProductById;
exports.deleteProductById = deleteProductById;