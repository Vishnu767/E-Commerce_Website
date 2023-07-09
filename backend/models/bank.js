const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bankSchema = new Schema({
    name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("banks", bankSchema);