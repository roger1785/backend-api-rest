import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
