const router = require('express').Router();
// const astroidController = require('../../controllers/astroidController');
const request = require('request');
const wikipedia = require("node-wikipedia");
const fs = require('fs')
const cheerio = require('cheerio');


router.post('/post', function(req, res) {
  let wikiObject = {}
   getRelated(wikiObject)
   function getRelated(wikiObject) {

    wikipedia.page.data(req.body.article, { content: true }, function(response) {
      // grabbing the html text
      let string = response.text['*']
      let $ = cheerio.load(string);
      // console.log(string)
      wikiObject.body = $('.mw-parser-output > p:nth-of-type(1)').text()
      wikiObject.img = $('.infobox img:nth-of-type(1)').attr('src') || $('.thumb.tright img:nth-of-type(1)').attr('src')
      let linkArray = [];
      let links = $('.mw-parser-output > p:nth-of-type(1) a').each((i, el)=>{
        let text = $(el).text()
        if (i > 0) {
          if (text[0] == "[") {
            null
          } else if (text == "translit.") {
            null
          }else if (text == 'lit') {
            null
          }else {
            linkArray.push(text)
          }
        }
      })
      if (linkArray.length < 10) {
        let links = $('.mw-parser-output > p:nth-of-type(2) a').each((i, el)=>{
          if (i > 5) {
            return
          }
          let text = $(el).text()
          if (text[0] == "[") {
            null
          } else {
            linkArray.push(text)
          }
        })
      }
      if (linkArray.length < 10) {
        let links = $('.mw-parser-output > p:nth-of-type(2) a').each((i, el)=>{
          if (i > 5) {
            return
          }
          let text = $(el).text()
          if (text[0] == "[") {
            null
          } else {
            linkArray.push(text)
          }
        })
      }
      wikiObject.subCategories = linkArray
      res.send(wikiObject)
    })
  }
})
  
module.exports = router;

