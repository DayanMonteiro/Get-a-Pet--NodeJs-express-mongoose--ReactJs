const jwt = require("jsonwebtoken");
const User = require("../models/User");

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ messsage: "Acesso negado. Token inválido!" });
  }

  // find user
  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;
