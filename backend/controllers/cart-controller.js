const HttpError = require("../models/http-error");
const Cart = require("../models/cart");

// Add product to cart
const addProductToCart = async(req, res, next) => {
    const { userId, productId } = req.body;
    const createdCart = new Cart({
        userId: userId,
        productId: productId,
        quantity: 1
    });

    console.log("createdCart: (From cart-controller)", createdCart);

    try {
        await createdCart.save();
    } catch (err) {
        console.error("THIS IS ERROR: ",err);
        const error = new HttpError(
            "Adding product to cart failed, please try again. (From cart-controller)",
            500
        );
        return next(error);
    }
    console.log("Added product to cart! (From cart-controller)\n");
    res.status(201).json({ cart: createdCart });
};

const getCartByUserId = async(req, res, next) => {
    const userId = req.params.uid;
    try {
        const requiredCart = await Cart.find({ userId: userId });
        console.log("Required Cart for given User ID: (From cart-controller) ", requiredCart);
        res.send(requiredCart);
    } catch (err) {
        const error = new HttpError(
            "Couldn't find cart, please try again. (From cart-controller)",
            500
        );
        return next(error);
    }
}

const checkProductInCart = async(req, res, next) => {
    const { userId, productId } = req.body;
    try {
        let requiredCart = [];
        requiredCart = await Cart.find({ userId: userId, productId: productId });
        console.log("Item found in cart: (From cart-controller) ", requiredCart);
        res.send(requiredCart);
    } catch (err) {
        const error = new HttpError(
            "Couldn't find cart, please try again. (From cart-controller)",
            500
        );
        return next(error);
    }
}

const updateCart = async(req, res, next) => {
    const { userId, productId, quantity } = req.body;
    let cartToUpdate;
    try {
        let requiredCart = [];
        requiredCart = await Cart.find({ userId: userId, productId: productId });
        console.log("Item found in cart: (From cart-controller) ", requiredCart);
        if(requiredCart.length > 0) {
            cartToUpdate = requiredCart[0];
        }else{
            const error = new HttpError(
                "Couldn't find cart with given userId and productId, please try again. (From cart-controller)",
                500
            );
            return next(error);
        }

        try {
            console.log("Cart to update: (From cart-controller) ", cartToUpdate);
            cartToUpdate.quantity = quantity;
            await cartToUpdate.save();
        } catch (err) {
            // console.error("THIS IS ERROR: ",err);
            const error = new HttpError(
                "Couldn't update quantity in cart, please try again! (From cart-controller)",
                500
            );
            return next(error);
        }

        res.send(requiredCart);
    } catch (err) {
        const error = new HttpError(
            "Couldn't find cart, please try again. (From cart-controller)",
            500
        );
        return next(error);
    }
}

const deleteItemFromCart = async(req, res, next) => {
    const userId = req.params.uid;
    const productId = req.params.pid;
    let cartToDelete;
    try {
        let requiredCart = [];
        requiredCart = await Cart.find({ userId: userId, productId: productId });
        if(requiredCart.length > 0) {
            cartToDelete = requiredCart[0];
            console.log("Cart to delete: (From cart-controller) ", cartToDelete);
            try {
                await Cart.findByIdAndDelete(cartToDelete._id);
                console.log("ITEM DELETED FROM CART SUCCESSFULLY! (From cart-controller)");
                res.send(requiredCart);
            } catch (err) {
                console.log("THIS IS ERROR: ", err);
                const error = new HttpError(
                    "Couldn't delete item from cart, please try again! (From cart-controller)",
                    500
                );
                return next(error);
            }
        }else{
            console.log("THIS IS ERROR: ", err);
            const error = new HttpError(
                "Couldn't find cart with given userId and productId, please try again. (From cart-controller)",
                500
            );
            return next(error);
        }

    } catch (err) {
        console.log("THIS IS ERROR: ", err);
        const error = new HttpError(
            "Couldn't find cart, please try again. (From cart-controller)",
            500
        );
        return next(error);
    }
}

exports.addProductToCart = addProductToCart;
exports.getCartByUserId = getCartByUserId;
exports.checkProductInCart = checkProductInCart;
exports.updateCart = updateCart;
exports.deleteItemFromCart = deleteItemFromCart;