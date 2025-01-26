const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favmovie: { type: String },
});

userSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isAlphanumeric(username)) {
    throw Error("Username must contain only letters and numbers");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("username not found");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("wrong password");
  }

  return user;
};

const user = mongoose.model("user", userSchema);

module.exports = user;
