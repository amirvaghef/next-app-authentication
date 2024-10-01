import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;
const userSchema = Schema(
  {
    userName: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String },
    family: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    role: { type: Schema.Types.ObjectId },
  },
  { timestamp: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
