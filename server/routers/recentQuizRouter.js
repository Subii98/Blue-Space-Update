import express from "express";
import expressAsyncHandler from "express-async-handler";
import RecentQuiz from "../models/recentQuizModel.js";

const recentQuizRouter = express.Router();

recentQuizRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const recent = await RecentQuiz.find({});
    res.send(recent);
  })
);

recentQuizRouter.get(
    "/:userid",
    expressAsyncHandler(async (req, res) => {
        var id = req.params.userid;
        console.log("hello im in recent quiz router id", id);
        
        const recent = await RecentQuiz.aggregate([
            {
                $match: {
                    userID: id,
                }
            },
            {$group: {
                    _id: "$quizID",
                    quizName: { $first: "$quizName" },
                    recordID : { $last: '$_id'},
                    count: {
                        $sum: 1,
                    },
                }
              }
        ]).sort({recordID: -1});
      console.log("recent object", recent);
        res.send(recent);
    })
);


recentQuizRouter.post(
  "/record",
  expressAsyncHandler(async (req, res) => {
    try {
      const { userID, quizID, name, correct, total } = req.body;
      console.log("saved record recent");
      console.log("userID is:", userID);
      console.log("quizID is:", quizID);
      console.log("name is:", name);
      console.log("correct is:", correct);
      console.log("total is:", total);

      if (!req.body) {
        return res.status(400).json({
          success: false,
          error: "You must provide feedback",
        });
      }

      const recentQuizElem = new RecentQuiz({
        userID: userID,
        quizID: quizID,
        quizName: name,
        correct, correct,
        total, total,
      });

      console.log(recentQuizElem);

      if (!recentQuizElem) {
        return res.status(400).json({ success: false, error: err });
      }

      recentQuizElem
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: recentQuizElem._id,
            message: "Feedback created!",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "Feedback not created!",
          });
        });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);



export default recentQuizRouter;
