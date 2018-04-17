const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String,
  img: String,
  url: String,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;


 
