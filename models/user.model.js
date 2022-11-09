const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  emailConfirm: {
    type: Boolean,
    default: false,
  },
});
module.exports=mongoose.model('user',schema)