import mongoose from "mongoose";

const authLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  email: {
    type: String
  },

  type: {
    type: String,
    required: true
  },

  sessionId: {
    type: String
  },

  provider: {
    type: String
  },

  status: {
    type: String
  },

  ip: {
    type: String
  },

  userAgent: {
    type: String
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("AuthLog", authLogSchema);
