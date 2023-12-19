const jwt = require("jsonwebtoken");
const getToken = require("./get-token");

// middleware to validate token
const checkToken = (req, res, next) => {
  // console.log("checkToken req", req.headers);

  const token = getToken(req);

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado. Sem autorização!" });
  }

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Sem Token!" });
  }

  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Acesso negado. Token inválido!" });
  }
};

module.exports = checkToken;
