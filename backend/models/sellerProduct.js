const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerProductSchema = new Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "sellers", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    productStatus: { type: Number , required: true}
    // 0 - NOT SOLD, 1 - SOLD, 2 - RETURNED (AFTER DELIVERY), 3 - CANCELLED (BEFORE DELIVERY)
});

module.exports = mongoose.model("sellerProducts", sellerProductSchema);