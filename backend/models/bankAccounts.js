const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bankAccountsSchema = ({
    bankName: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    accountNumber: {type: String, required: true},
    balance: {type: Number, required: true}
});

module.exports = mongoose.model("bankAccounts", bankAccountsSchema);

