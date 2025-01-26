const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ error: "no authorization token " });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(_id).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: "auth request denied" });
  }
};

module.exports = requireAuth;
