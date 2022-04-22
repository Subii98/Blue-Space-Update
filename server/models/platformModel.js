import mongoose from 'mongoose'

const platformSchema = new mongoose.Schema({
    userId : String,
    userName: String,
    // name: String,
    title: String,
    description: String,
    subscriber: [String], //number
    icon: String,
    // banner: String,
    banner: String,
    fontFamily: String,
    titleFontSize: Number,
    descFontSize: Number,
    fontColor: String,
    tag1: String,
    tag2: String,
    tag3: String,
});

const Platform = mongoose.model('Platform', platformSchema)

export default Platform