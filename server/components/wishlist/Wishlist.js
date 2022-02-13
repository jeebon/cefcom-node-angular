const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
module.exports = WishlistModel;
