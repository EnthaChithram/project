// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const Blog = require("./blog");
const Comment = require("./comment");

const pool = require("./db");



const Commentu = require("./commentu")

const Movie = require("./movie")

const cors = require('cors');
app.use(cors({ origin: '*' }))
app.use(express.json());



// const corsOptions = {
//   origin: '*', // Allow requests from all origins
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

const coool = "ajkfhljkahf alf"
// const blogs = [
//   { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur", },
//   { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consecteturn", },
//   { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur", },
// ];



app.get("/about", (req, res) => {
  res.render("sample", { coool });
});

app.get("/setup", (req, res) => {
  pool.query("CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(20), address VARCHAR(100))");
})

app.get("/", (req, res) => {
  Blog.find().then((result) => {
    res.render("blogs", { blogs: result });

  })

});


//--------------forms--------------//

app.get("/comment", (req, res) => {
  res.render("newcomment");
})

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



// app.get("/commentuu/:id", async (req, res) => {

//   const parent = await Commentu.findById(req.params.id)
//   const children = await Commentu.find({ parentid: req.params.id })

//   let all = []

//   // console.log(parent._id)
//   // console.log(children);
//   for (const child of children) {
//     console.log(child._id)
//     // console.log(child)
//     await Commentu.find({ parentid: child._id }).then((data) => {
//       all.push(...data)
//       console.log(data)


//     })
//   }

//   res.json(all)

// })


//---------post req---------//


app.post("/newcommentu", async (req, res) => {

  console.log("requst recvd")
  Object.keys(req.body).forEach(key => {
    if (req.body[key] === "") {
      req.body[key] = null;  // Convert empty string to null
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

  // Validation check
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


app.post("/newcomment", (req, res) => {

  const comment = new Comment(req.body);
  comment.save().then(() => {
    console.log("New comment made");
    res.json({ message: "Comment added successfully!" });
    res.redirect("/about")
  })
    .catch((err) => {
      console.error("Error saving comment:", err);
      res.json({ message: "Failed to add comment.", error: err.message });
    });
  // res.redirect("/about");
})



app.get("/comments", (req, res) => {
  Comment.find().then((result) => {
    // res.render("blogs", { blogs: result });
    res.json(result)

  })

});






app.get("/blogss", (req, res) => {

  // res.render("about", );
  const blog = new Blog({ title: "hihihhi 2", snippet: "about me", body: "mewefwef" });
  blog.save().then((resu) => {

    res.send(resu);
    console.log("sent");
  });
});

app.get("/allblogs", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin: *");
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database to show on your view
    res.json(blogs);
    console.log("sent");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
  }
});

app.get("/blogs/create", (req, res) => {
  res.render("createblog");
  console.log("page sent");
});

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id).then((resu) => {
    console.log(resu);
    res.send(resu);

  })
});

app.post("/blogs/create", (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then(() => {
    console.log("new blog made");
    res.redirect("/about");
  })
})




// app.post("/blogs", async (req, res) => {
//   try {
//     const { title, snippet, body } = req.body;

//     if (!title || !snippet || !body) {
//       return res.status(400).json({ error: "All fields are required" }); // Just simple validations
//     }

//     const blog = new Blog({ title, snippet, body });
//     const savedBlog = await blog.save();

//     return res.status(201).json(savedBlog);
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to create blog", details: error.message });
//   }
// });

