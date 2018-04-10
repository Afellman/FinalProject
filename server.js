const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes')

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/bubbles";
const PORT = process.env.PORT || 3001;

const User = require('./models/user')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);

app.use(passport.initialize());
app.use(routes);



app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
}); 
