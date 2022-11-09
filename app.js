const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use("/users", require("./api/user.api"));
app.use("/messages", require("./api/message.api"));
mongoose.connect(process.env.CONNECTION_STRING, () => {
  console.log("connected");
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
