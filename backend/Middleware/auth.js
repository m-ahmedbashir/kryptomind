const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  //   checking token

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.json({ message: "Token is not provided" });
    }
    const decodedToken = jwt.verify(token, `${process.env.DECODE_TOKEN}`);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    res.json({ message: "Authorization failed", error: err });
  }
};
