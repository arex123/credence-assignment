const express = require("express");
const app = express();
const mongoose = require("mongoose");


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

const defaultName=
[{
  name: "Harry Potter and the Order of the Phoenix",
  img: "https://bit.ly/2IcnSwz",
  summary: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry. "
  }, {
  name: "The Lord of the Rings: The Fellowship of the Ring",
  img: "https://bit.ly/2tC1Lcg",
  summary: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
  }, {
  name: "Avengers: Endgame",
  img: "https://bit.ly/2Pzczlb",
  summary: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
  }
]


//read
app.get("/", async (req, res) => {
  
  db.collection('films').count(function(err, count) {
    

    if( count == 0) {
      Film.insertMany(defaultName,function(err) {
        if(err){
          console.log(err);
        }
        else{
          console.log("items succesfully inserted");
        }

      });
    }
    else {
        console.log("Found Records : " + count);
    }
});
  try{
        const films = await Film.find();
        res.send(films);

  }catch(err){
        res.send(err);
  }


});


//create
app.post('/',async(req,res)=>{

    try{
      const film = new Film(req.body)
      console.log(film);
        const data = await film.save()
        res.json(data)
    }catch(err){
        res.json(err);
    }

})


//update
app.patch('/:id', async (req, res) => {
    try {
    const updatefilm = await Film.findByIdAndUpdate(req.params.id, req.body,{ new:true});
    res.send(updatefilm);
    }catch(err) {
    res.send(err)
    }
    });


 //delete
app.delete('/:id', async (req, res) => {

  try {
    const temp = await Film.findByIdAndRemove(req.params.id);
    res.send("document deleted: "+temp)
  
  }
 catch(err) {
    res.send(err);
 }  
});



const port = 3000;

app.listen(port, (error) => {
  console.log(`Server listening on port ${port}`);
});
