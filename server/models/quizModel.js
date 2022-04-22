import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    //Automatically produced by mongodb
    /* _id: {
        type: String
    }, */
    title: {
        type: String
    },
    description: {
        type: String
    },
    platformId:{
        //platform id contains this quiz
        type: String
    },
    likes: {
        type: Number
    },
    quizImage:{
        type:String
    }
});

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz