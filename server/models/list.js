const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  number: { type: Number, required: true }, // Comment content

  createdAt: { type: Date, default: Date.now }, // Timestamp}  // Reference to parent comment (null for top-level comments)
});

const List = mongoose.model("List", listSchema);

module.exports = List;
