const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    sellerAccountNumber: { type: String, ref: "sellers", required: true },
    userAccountNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionStatus: { type: String, required: true }
});

module.exports = mongoose.model("transactions", transactionSchema);