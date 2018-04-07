const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  joinDate: Date,
  saved: {
    type: Schema.Types.ObjectId,
    ref: "Saved"
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
