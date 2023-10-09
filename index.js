const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const PostModel = require('./models/PostModel')
const PostStudentModel = require('./models/PostStudentModel')
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


app.use(express.static('Public'))


mongoose.connect('mongodb+srv://muntasiraahmed3:FUgU97yOz0FW0u44@blog.hdeqtmj.mongodb.net/?retryWrites=true&w=majority');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/create', upload.single('file'), (req, res) =>{
//   console.log(req.file)
  PostModel.create({title:req.body.title, 
    descriptions:req.body.descriptions, 
    file: req.file.filename, email: req.body.email})
    .then(result => res.json("Success"))
    .catch(err => res.json(err))
})


app.get('/getposts', (req, res) =>{
    PostModel.find().sort({_id:-1})
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

app.get('/getpostatnotice', (req, res) =>{
    PostModel.find().sort({_id:-1}).limit(3)
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
})

app.get('/getpostbyid/:id', (req, res) =>{
    const id = req.params.id
    PostModel.findById({_id:id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

app.put('/editpost/:id', (req, res) =>{
    const id = req.params.id
    PostModel.findByIdAndUpdate({_id:id}, {
        title:req.body.title, 
        descriptions:req.body.descriptions})
        .then(result => res.json("Succes"))
        .catch(err => res.json(err))
})

app.delete('/deletepost/:id', (req, res) =>{
    PostModel.findByIdAndDelete({_id:req.params.id})
    .then(result => res.json("Succes"))
    .catch(err => res.json(err))
})

app.get('/logout', (req, res) =>{
  res.clearCookie('token');
  return res.json("Success")
})


app.post('/createStudent' , (req, res) =>{
    //   console.log(req.file)
    PostStudentModel.create(req.body)
    .then(result => res.json("Succes"))
    .catch(err => res.json(err))
})

app.get('/getStudents' , (req, res) =>{
    PostStudentModel.find()
    .then(poststu => res.json(poststu))
    .catch(err => res.json(err))
})

app.get('/getstudentbyid/:id', (req, res) =>{
    const id = req.params.id
    PostStudentModel.findById({_id:id})
    .then(poststu => res.json(poststu))
    .catch(err => console.log(err))
})

app.put('/editstudent/:id', (req, res) =>{
    const id = req.params.id
    PostStudentModel.findByIdAndUpdate({_id:id}, {
        title:req.body.title, 
        description:req.body.description,
        presents:req.body.presents,
        days:req.body.days,
        reg:req.body.reg,
        roll:req.body.roll,
        cata:req.body.cata
    })
        .then(result => res.json("Succes"))
        .catch(err => res.json(err))
})

app.delete('/deletestudent/:id', (req, res) =>{
    PostStudentModel.findByIdAndDelete({_id:req.params.id})
    .then(result => res.json("Succes"))
    .catch(err => res.json(err))
})



// ========================= 

app.get('/paginated' ,async (req, res)=>{
    const allUser = await PostStudentModel.find({}).sort({_id:-1})
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)


    const startIndex = (page-1)*limit
    const lastIndex = (page)*limit

    const results = {}
    results.totalUser = allUser.length
    results.pageCount = Math.ceil(allUser.length/limit)



    if(lastIndex<allUser.length){
        results.next= {
            page:page+1
        }
    }
   
   if(startIndex>0){
    results.prev={
        page:page-1,
    }
   }

    results.result = allUser.slice(startIndex, lastIndex)
    res.json(results)
})

app.get('/search/:key' , async (req, res) =>{
    const search = await PostStudentModel.find(
        {
          "$or":[
            {"title": {$regex: req.params.key} },
            {"description": {$regex: req.params.key} },
          ]
        }
    )
    res.json(search)
})

app.get('/searchnotice/:key' , async (req, res) =>{
    const search = await PostModel.find(
        {
          "$or":[
            {"title": {$regex: req.params.key} },
            {"descriptions": {$regex: req.params.key} },
          ]
        }
    )
    res.json(search)
})

app.listen(3001, ()=>{
    console.log("Server is running")
})

