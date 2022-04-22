import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js'
import Quiz from '../models/quizModel.js'
import { createRequire } from "module";
import { uploadModule } from '../utils.js';
const require = createRequire(import.meta.url);
var mongoose = require("mongoose");

const quizRouter = express.Router();

quizRouter.get('/', expressAsyncHandler(async (req, res) => {
    const quizzes = await Quiz.find({})
    res.send(quizzes)
}))

quizRouter.get('/seed', 
    expressAsyncHandler(async(req, res) => {
        //await Quiz.remove({})
        const createdQuizzes = await Quiz.insertMany(data.quizzes)
        res.send({ createdQuizzes });
    })
)

quizRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const quizzes = await Quiz.find({ platformId : req.params.id });
        res.send(quizzes);
    })
);

quizRouter.get(
    '/get_quiz/:id', 
    expressAsyncHandler(async (req, res) => {
        const idVal = mongoose.Types.ObjectId(req.params.id);
        const allquiz = await Quiz.find({});
        console.log("all quizzes are " , allquiz);
        const onlyQuiz = allquiz[0]._id;
        const quiz = await Quiz.findOne({_id: req.params.id});
        console.log("quiz id is ", (idVal));
        console.log("type of variable is " , typeof(idVal));
        console.log("type of variable is " , typeof(onlyQuiz));
        console.log("quiz is ", quiz);
        console.log(typeof(quiz));
        console.log(typeof(JSON.stringify(quiz)));
        console.log(JSON.stringify(quiz));
        if (quiz){
            res.send(quiz)
        }else{
            res.status(404).send({message: 'Quiz Not Found'})
        }
    })
);

quizRouter.post(
    "/insert",
    uploadModule.array("file"),
    expressAsyncHandler(async (req, res) => {
        try{
            const { title, description, platformId, likes } = req.body;
            const imagePath = req.files[0] ? "/" + req.files[0].path : "/images/sample.jpeg";
            const createdQuiz = await Quiz.insertMany([
                {
                    platformId: platformId,
                    title : title,
                    description : description,
                    likes:0,
                    quizImage: imagePath
                },
            ]);
            res.send(createdQuiz);
        } catch (err){
            console.log(err);
            res.send(err);
        }
    })
);

quizRouter.post(
    "/editLikes",
    expressAsyncHandler(async (req, res) => {
        const { quizId, likes } = req.body;

        const editLikes = await Quiz.updateOne(
            { _id: quizId },
            {
                $set: {
                    likes: likes
                },
            }
        );
        res.send(editLikes);
    })
);
//quizRouter.put('/quiz/:id', QuizCtrl.updateQuiz)
//quizRouter.get('/quiz/:nid', QuizCtrl.getQuizById)
//quizRouter.get('/quizzes', QuizCtrl.getQuizzes)

export default quizRouter