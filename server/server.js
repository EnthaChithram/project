// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const express = require("express");

const app = express();
const mongoose = require("mongoose");


const Commentu = require("./commentu")

const Movie = require("./movie")

const cors = require('cors');
app.use(cors({ origin: '*' }))
app.use(express.json());



// const corsOptions = {
//   origin: '*', 
// };
// app.use(cors(corsOptions));



const dbURL = "mongodb+srv://asdf:ASDF123@cluster0.ms8hx.mongodb.net/pracccc?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURL).then(() => {
  console.log("mongo connected")
});

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
console.log("kjj");

app.listen(3000);



app.get("/", (req, res) => {
  Blog.find().then((result) => {
    res.render("blogs", { blogs: result });

  })

});


//--------------forms--------------//



app.get("/commentu", (req, res) => {
  res.render("newcommentu");
})

app.get("/newmovie", (req, res) => {
  res.render("movies");
})



//-----------get reqs-----------//

app.get("/commentu/:id", async (req, res) => {
  let all = [];
  all.push(await Commentu.findById(req.params.id))

  const findchildren = async (parentid) => {
    const children = await Commentu.find({ parentid: parentid })
    all.push(...children)

    for (const child of children) {
      await findchildren(child._id)
    }

  }
  await findchildren(req.params.id)
  res.json(all)
  console.log(all)
})

app.get("/movies", (req, res) => {
  console.log(req)
  console.log(req.body)

  Movie.find().then((result) => {

    res.json(result)

  })

});

app.get("/movies/:id", async (req, res) => {

  const movie = await Movie.findById(req.params.id)
  const comments = await Commentu.find({ movieid: req.params.id })

  res.json({ movie, comments })
});




app.post("/newcommentu", async (req, res) => {

  console.log("requst recvd")
  Object.keys(req.body).forEach(key => {
    if (req.body[key] === "") {
      req.body[key] = null;
    }
  })
  console.log(req.body)
  try {
    const comment = new Commentu(req.body);
    await comment.save();
    res.status(201).json({ message: "comment created successfully!" });
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).json({ error: "Failed to save comment" });
  }
  // res.redirect("/commentu")
})


app.post("/newmovie", async (req, res) => {
  const { name, year } = req.body;


  if (!name || !year) {
    return res.status(400).json({ error: "Name and year are required" });
  }

  try {
    const movie = new Movie({ name, year });
    await movie.save();
    res.status(201).json({ message: "Movie created successfully!" });
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).json({ error: "Failed to save movie" });
  }
});
























