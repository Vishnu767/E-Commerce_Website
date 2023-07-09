const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model("cart", cartSchema);