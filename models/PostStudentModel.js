const mongoose = require('mongoose')

const PostStudentSchema = new mongoose.Schema({
    title:String,
    description:String,
    // email:String,
    presents:Number,
    days:Number
})

const PostStudentModel = mongoose.model('postStudent', PostStudentSchema)

module.exports = PostStudentModel