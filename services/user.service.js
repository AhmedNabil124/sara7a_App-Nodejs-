const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { sendEmail } = require("../emails/user.email");
module.exports.signUp = async (req, res) => {
  const { name, email, password, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    res.json({ message: "Account Already Exist" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      await userModel.insertMany({ name, email, password: hash, age });
      let token = jwt.sign({ email }, "Ahmed"); //,{expiresIn:"60*60"}
      sendEmail({ email, token, message: "Hello from me" });
      res.json({ message: "Success" });
    });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      var token = jwt.sign(
        { userId: user._id, name: user.name, emailConfirm: user.emailConfirm },
        "secertKey"
      );
      if (user.emailConfirm==true) {
        
        res.json({ message: "Login Ok", token });
      } else {
        res.json({ message:"Confirm Your EMail First"});
      }
    } else {
      res.json({ message: "password incorrect" });
    }
  } else {
    res.json({ message: "account not found" });
  }
};

module.exports.emailVerfiy = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, "Ahmed", async (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      let user = await userModel.findOne({ email: decoded.email });
      if (user) {
        await userModel.findOneAndUpdate({ email: decoded.email }, { emailConfirm: true });
        res.json({ message: "Email Verfiyed" });
      } else {
        res.json({ message: "Email Not Found" });
      }
    }
  });
};
