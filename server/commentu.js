const mongoose = require("mongoose");

const commentuSchema = new mongoose.Schema({
    name: { type: String, required: true },  // User's name
    text: { type: String, required: true },  // Comment content
    movieid: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },

    parentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentu',
        default: null
    },
    createdAt: { type: Date, default: Date.now },  // Timestamp}  // Reference to parent comment (null for top-level comments)
});

const Commentu = mongoose.model("Commentu", commentuSchema);

module.exports = Commentu;

