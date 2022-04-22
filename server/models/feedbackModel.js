import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    //unique: true,
  },
  feedback: {
    type: String,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
