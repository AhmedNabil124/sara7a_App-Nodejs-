const { auth } = require("../middleware/auth");
const { addMessage ,allMessage} = require("../services/message.service");

const app = require('express').Router()

app.post('/addMessage',addMessage)
app.get('/allMessage',auth,allMessage)
module.exports = app