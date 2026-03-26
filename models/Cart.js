import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
          default: 1,
          min: 1,
        },
      },
    ],
  },

  { timestamps: true },
);

export default mongoose.model("Cart", cartSchema);

[
  {
    product: "mouse",
    quantity: 4,
  },
];
