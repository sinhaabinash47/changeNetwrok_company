import userSchema from "../models/userModel.js";
import { verifyToken } from "../utils/token.js";

export const getSelectedTopics = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ error: "Authorization header missing", staus: 401 });
    }
    const tokenParts = req.headers.authorization.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ error: "Invalid authorization header format", staus: 401 });
    }
    const token = tokenParts[1];
    const { userId } = verifyToken(token);
    const { topics } = req.body;

    if (!Array.isArray(topics) || topics.length === 0) {
      return res
        .status(400)
        .json({ error: "Topics must be a non-empty array", status: 400 });
    }
    const user = await userSchema.findByIdAndUpdate(userId, { topics: topics });
    if (!user) {
      return res.status(404).json({ error: "User not found", status: 404 });
    }
    user.topics = topics;
    await user.save();
    res
      .status(200)
      .json({
        message: "Topics selected successfully",
        staus: 200,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to select topics.", staus: 500 });
  }
};

