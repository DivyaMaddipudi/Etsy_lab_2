var jwt = require('jsonwebtoken');
const SECRET_KEY = "my-secret-key-0001xx01212032432";
const AUTHENTICATION_HEADER = "x-authentication-header";

function verifyToken(req, res, next) {
  const tokenHeader = req.headers[AUTHENTICATION_HEADER];
  if (tokenHeader != "null") {
    if (jwt.verify(tokenHeader, SECRET_KEY)) {
      next();
    }
  } else {
    res.status(401).json({ msg: "Unauthorized!" });
  }
}

module.exports= {
  verifyToken
}