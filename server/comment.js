// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,

    }
}, { timestamps: true });


const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
