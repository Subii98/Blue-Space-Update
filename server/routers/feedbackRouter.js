import express from "express";
import expressAsyncHandler from "express-async-handler";
import Feedback from "../models/feedbackModel.js";

const feedbackRouter = express.Router();

feedbackRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const quizzes = await Feedback.find({});
    res.send(quizzes);
  })
);

feedbackRouter.post(
  "/savefeedback",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email,feedback } = req.body;
      console.log("saved feedback");
      console.log("email is:" , email);
      console.log("feedback is:", feedback);
      if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide feedback',
        })
    }

    const feedbackElem = new Feedback({
      email: email,
      feedback: feedback,
    });

    if (!feedbackElem) {
        return res.status(400).json({ success: false, error: err })
    }

    feedbackElem
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: feedbackElem._id,
                message: 'Feedback created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Feedback not created!',
            })
        })
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);

export default feedbackRouter;
