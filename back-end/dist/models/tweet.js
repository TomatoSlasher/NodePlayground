"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tweetSchema = new Schema({
    imageUrl: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = mongoose.model("Tweet", tweetSchema);