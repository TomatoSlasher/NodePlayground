"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    tweets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
        },
    ],
}, { timestamps: true });
module.exports = mongoose_1.default.model("User", userSchema);
