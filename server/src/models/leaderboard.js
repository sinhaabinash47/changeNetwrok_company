import mongoose from "mongoose";
const leaderboard = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  wrongAnswer: {
    type: String,
    required: true,
  },
  average: {
    type: String,
    required: true,
  },
});
const _userleaderboard = mongoose.model("leaderboard", leaderboard);
export default _userleaderboard;
