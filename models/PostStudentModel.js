const mongoose = require('mongoose')

const PostStudentSchema = new mongoose.Schema({
    title:String,
    description:String,
    presents:Number,
    days:Number,
    reg:Number,
    roll:Number,
    cata:String
})

const PostStudentModel = mongoose.model('postStudent', PostStudentSchema)

module.exports = PostStudentModel
