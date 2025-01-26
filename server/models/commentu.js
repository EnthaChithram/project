const mongoose = require("mongoose");

const commentuSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  // User's name
  text: { type: String, required: true }, // Comment content
  movieid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
    required: true,
  },

  parentid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commentu",
    default: null,
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp}  // Reference to parent comment (null for top-level comments)
});

const Commentu = mongoose.model("Commentu", commentuSchema);

module.exports = Commentu;
