import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const roleSchema = mongoose.Schema({
  roleName: { type: String, required: true },
  roleAccess: [String],
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;
