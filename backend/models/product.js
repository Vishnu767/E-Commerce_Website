const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema for buying a product from the store
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    discount: { type: Number }
});

module.exports = mongoose.model("products", productSchema);