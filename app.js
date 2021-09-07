const { request, response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const url = "mongodb://localhost:27017/filmsNames_db";

var db = mongoose.connection;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Successfully");
  });

const Schema = mongoose.Schema;

const filmSchema = new Schema({
  name:{
  type: String,
   required:true
  }
   ,
  img: {
    type: String,
     required:true
    },
  summary: {
    type: String,
     required:true
    },
});

const Film = mongoose.model("film", filmSchema);

const film1 = new Film({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary:
    "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
});

const film2 = new Film({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary:
    "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
});
const film3 = new Film({
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary:
    "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry.",
});

const defaultName = [film1,film2,film3];


//read
app.get("/", async (req, res) => {
    try {
    
      Film.insertMany(defaultName,function(err) {
        if(err){
          console.log(err);
        }
        else{
          console.log("items succesfully inserted");
        }

      });
    // const films = Film.find();
    const films = await Film.find()
    res.json(films);

    res.json(films);
  } catch (err) {
    res.send(err);
  }
});


//create
app.post('/',async(req,res)=>{
    const film = new Film({
        name:req.body.name,
        image:req.body.img,
        summary:req.body.summary
    })

    try{
        const data = await film.save()
        res.json(data)
    }catch(err){
        res.json('Error');
    }

})


//update
app.patch('/:id', async (req, res) => {
    try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if(!post) throw Error('Something went wrong while updating the post');
    res.status(200).json({success: true});
    }catch(err) {
    res.status(400).json({msg:err});
    }
    });


 //delete
app.delete('/:id', async (req, res) => {
    try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if(!post) throw Error('No post found!');
    res.status(200).json({success: true})
    }catch(err) {
    res.status(400).json({msg: error})
    }
    });



const port = 3000;

app.listen(port, (error) => {
  console.log(`Server listening on port ${port}`);
});
