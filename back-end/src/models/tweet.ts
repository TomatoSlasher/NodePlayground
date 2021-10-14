import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", tweetSchema);
