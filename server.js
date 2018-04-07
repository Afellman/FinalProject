const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const models = require('./models');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/astroids";
const PORT = process.env.PORT || 3001;
const routes = require('./routes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));
app.use(routes);


mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);



app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
}); 
