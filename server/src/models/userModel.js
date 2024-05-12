import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  topics: {
    type: [String],
  },
});
const _user = mongoose.model("register", usersSchema);
export default _user;
