const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  saved: {
    type: Schema.Types.ObjectId,
    ref: "Saved"
    }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;


 

 
 
