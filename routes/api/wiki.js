const router = require('express').Router();
// const astroidController = require('../../controllers/astroidController');
var request = require('request');
var wikipedia = require("node-wikipedia");
const fs = require('fs')


router.post('/post', function(req, res) {
  console.log(req.body.article)

  wikipedia.page.data(req.body.article, { content: true }, function(response) {
    let wikiObject = {}
    // grabbing the html text
    let string = response.text['*']

    // finding the img url ---------------------------
    let imgStart = string.indexOf('src="//')
    let imgEnd = string.indexOf('.jpg"', imgStart)
    let imgUrl = string.substr(imgStart + 7, (imgEnd - imgStart) - 3)
    wikiObject.img = imgUrl;
    // ----------------------------------

    // finding the first ten links ---------------
    let i = 0;
    let linkArray = [];
    let urlStart = 'https://en.wikipedia.org'
    let linkStartingPoint = string.indexOf('File', imgEnd)
    getLinks(linkStartingPoint)
    function getLinks(startPoint){
      let linkStart = string.indexOf('<a href="', startPoint)
      let linkEnd = string.indexOf('" ', linkStart)
      let linkName = string.substr(linkStart + 15, linkEnd-(linkStart+15))
      let newArray = [];
      linkName.split('_').forEach(element => {
        newArray.push(element)
      });
      let fullName = newArray.join(' ')
      console.log(fullName)
      linkArray.push(fullName)
      i ++
      if(i < 5) {
        getLinks(linkEnd)
      }
    }
    wikiObject.subCategories = linkArray
  //  let fullLinks = linkArray.map((element, index)=> {
  //     return element
  //   })
    
    // console.log(string.substr(600, 399))
    res.send(wikiObject)
  })
 
})

  
module.exports = router;

