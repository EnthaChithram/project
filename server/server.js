// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const Commentu = require("./models/commentu");
const Movie = require("./models/movie");
const User = require("./models/user");
const List = require("./models/list");

const cors = require("cors");
app.use(cors({ origin: "*" }));
const jwt = require("jsonwebtoken");
const requireAuth = require("./middleware/requireAuth.js");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

// const corsOptions = {
//   origin: '*',
// };
// app.use(cors(corsOptions));

const dbURL = process.env.MONGO_DB;

mongoose.connect(dbURL).then(() => {
  console.log("mongo connected");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("kjj");

app.listen(process.env.PORT, () => {
  console.log("listening to ", process.env.PORT);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await User.signup(username, password);
    const token = createToken(user._id);
    const userid = user._id;

    res.status(200).json({ username, userid, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    const userid = user._id;

    res.status(200).json({ username, userid, token, message: "logged in" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
    console.log(error.message);
  }
});

app.get("/", (req, res) => {
  Blog.find().then((result) => {
    res.render("blogs", { blogs: result });
  });
});

//--------------forms--------------//

app.get("/commentu", (req, res) => {
  res.render("newcommentu");
});

app.get("/newmovie", (req, res) => {
  res.render("movies");
});

app.get("/signup", (req, res) => {
  res.render("newuser");
});

//-----------get reqs-----------//

app.get("/users", async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const comments = await Commentu.find({ userid: req.params.id })
      .populate("movieid", "name")
      .lean()
      .exec();

    res.status(200).json({ user, comments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/commentu/:id", async (req, res) => {
  let all = [];
  all.push(await Commentu.findById(req.params.id));

  const findchildren = async (parentid) => {
    const children = await Commentu.find({ parentid: parentid });
    all.push(...children);

    for (const child of children) {
      await findchildren(child._id);
    }
  };
  await findchildren(req.params.id);
  res.json(all);
  console.log(all);
});

app.get("/movies", (req, res) => {
  console.log(req);
  console.log(req.body);

  try {
    Movie.find().then((result) => {
      res.status(201).json(result);
    });
  } catch (error) {
    res.status(400).json("server error:: ");
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const comments = await Commentu.find({ movieid: req.params.id })
      .populate("userid", "username")
      .lean()
      .exec();
    res.json({ movie, comments });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

////////////spam///////////////////

app.use(requireAuth);

app.post("/newcommentu", async (req, res) => {
  console.log("requst recvd");
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "") {
      req.body[key] = null;
    }
  });

  const { text, parentid, movieid } = req.body;

  const userid = req.user._id;
  try {
    const comment = new Commentu({ text, parentid, movieid, userid });
    const savedcomment = await comment.save();

    const populatedComment = await Commentu.findById(savedcomment._id)
      .populate("userid", "username")
      .lean() //  plain js object lightweighy
      .exec(); //for promise

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(400).json({ error: "Failed to save comment" });
  }
});

app.delete("/commentu/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await Commentu.findById(id);
    const children = await Commentu.find({ parentid: id });

    if (children.length > 0) {
      comment.text = "[DELETED COMMENT]";
      comment.userid = null;
      await comment.save();
      res.status(200).json(id);
    } else {
      const deletedcomment = await Commentu.findByIdAndDelete(id);
      console.log(deletedcomment._id);

      if (deletedcomment) {
        res.status(200).json(id);
      } else {
        res.status(404).json({ error: "Item with id  not found" });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while deleting the item",
      details: error.message,
    });
  }
});

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

/////////-----//////////

app.post("/newlist", async (req, res) => {
  const { name, number } = req.body;

  try {
    const item = new List({ name, number });
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error("Error saving movie:", error);
    res.status(500).json({ error: "Failed to save movie" });
  }
});

app.get("/list", (req, res) => {
  console.log(req);

  try {
    List.find().then((result) => {
      res.status(201).json(result);
    });
  } catch (error) {
    res.status(400).json("server error:: ");
  }
});
