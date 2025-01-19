// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });


const Blog = mongoose.model("Blogg", blogSchema);
module.exports = Blog;
