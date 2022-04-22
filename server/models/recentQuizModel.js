import mongoose from "mongoose";

const recentQuizModelSchema = new mongoose.Schema({
  userID: {
    type: String,
    //unique: true,
  },
  quizID: {
    type: String,
  },
  quizName: {
    type: String,
  },
  correct: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

const RecentQuizModel = mongoose.model(
  "RecentQuizModel",
  recentQuizModelSchema
);

export default RecentQuizModel;
