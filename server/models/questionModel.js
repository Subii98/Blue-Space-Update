import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
    // _id: String,
    quizId: String,
    questionNum: Number,
    text: String,
    option: [String],
    answer: String,
    first: Number,
    second: Number,
    third: Number,
    fourth: Number
})

const Question = mongoose.model('Question', questionSchema)

export default Question