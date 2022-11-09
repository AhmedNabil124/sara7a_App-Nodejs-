const Joi = require("joi");
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(16).max(50),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repassword: Joi.ref("password"),
});
module.exports.userValidation = (req, res, next) => {
  const msgArray = [];
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.map((er) => {
      msgArray.push(er.message);
    });
    console.log(msgArray);
    res.json(msgArray);
  } else {
    next();
  }
};
