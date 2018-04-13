const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes');
const cookieParser = require('cookie-parser')
const session = require('cookie-session');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/bubbles";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));
app.use(express.static("client/build"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);


app.use(routes);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
}); 
