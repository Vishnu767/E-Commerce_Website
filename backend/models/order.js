const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    price: { type: Number, required: true },
    path: { type: [String], required: true },
    reachedWarehouseNumber: { type: Number, required: true },
    status: { type: String, required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model("orders", orderSchema);