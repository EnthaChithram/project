const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  telname: { type: String }, // User's name
  year: { type: Number, required: true },
});

const movie = mongoose.model("movie", movieSchema);

module.exports = movie;
