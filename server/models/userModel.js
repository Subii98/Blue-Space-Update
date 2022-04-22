import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    //unique: true,
  },
  expire: {
    type: Date,
  },
  points: {
    type: Number,
  },
  email: {
    type: String,
    //unique: true,
  },
  uniqueId: {
    type: Number,
  },
  subscribedPlatforms: {
    type: [String]
  },
  exp:{
    type: Number,
  },
  quizPlayed:{
    type: Number,
  },
  badge: {
    type: String
  },
  title: {
    type: String
  },
  correct: {
    type: Number,
  },
  totalQuestions: {
    type: Number,
  },
  playCount: {
    type: Number
  },
  level: {
    type: Number
  },
  userImage: {
    type: String
  }
});

const User = mongoose.model("User", userSchema);

export default User;
