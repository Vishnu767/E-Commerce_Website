const HttpError = require("../models/http-error");
const Order = require("../models/order");
const Product = require("../models/product");

const getOrders = async (req, res, next) => {
    const userId = req.params.uid;
    let orders;
    let orderDetails = [];
    try {
        orders = await Order.find({ userId: userId });
        for (let i = 0; i < orders.length; i++) {
            let reqproduct = await Product.find({ _id: orders[i].productId });
            orderDetails.push({
                orderId: orders[i]._id,
                productName: reqproduct[0].name,
                quantity: orders[i].quantity,
                price: orders[i].price,
                description: reqproduct[0].description,
                path: orders[i].path,
                reachedWarehouseNumber: orders[i].reachedWarehouseNumber,
                status: orders[i].status
            });
        }
        console.log(orderDetails);
        res.send(orderDetails);
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Fetching orders failed, please try again later.",
            500
        );
        return next(error);
    }
};

const updatePath = async (req, res, next) => {
    const { orderId } = req.body;
    let order;
    try {
        order = await Order.findById(orderId);
        console.log("ORDER: ", order);
        order.reachedWarehouseNumber += 1;
        await order.save();
        res.send(order);
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Something went wrong, could not update path.",
            500
        );
        return next(error);
    }
}

const updateStatus = async (req, res, next) => {
    const { orderId } = req.body;
    let order;
    try {
        order = await Order.findById(orderId);
        console.log("ORDER: ", order);
        order.status = "DELIVERED";
        await order.save();
        res.send(order);
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Something went wrong, could not update status.",
            500
        );
        return next(error);
    }
}

exports.getOrders = getOrders;
exports.updatePath = updatePath;
exports.updateStatus = updateStatus;