var jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  let token = req.header("token");
  jwt.verify(token, "secertKey", (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      req.id = decoded.userId;
      next();
    }
  });
};
