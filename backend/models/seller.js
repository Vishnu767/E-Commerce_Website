const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("sellers", sellerSchema);