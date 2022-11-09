const { userValidation } = require("../middleware/validation/user.validation");
const { signUp, signIn, emailVerfiy } = require("../services/user.service");
const app = require('express').Router()

app.post('/signup',userValidation,signUp)
app.post('/signin',signIn)
app.get('/verfiy/:token',emailVerfiy)

module.exports = app