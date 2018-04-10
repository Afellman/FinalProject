const router = require('express').Router();

var request = require('request');

router.get('/get', function(req, res) {
  request({
    url:'http://collection.sciencemuseum.org.uk/search/objects/gallery/information%20age%20gallery:%20web?random=20',
    method: "GET",
    headers: {
      'crossdomain': 'true',
      "accept": "application/json ",
      'Content-Type': 'application/json',
    }
  }, (error, response, body) => {
    console.log(JSON.parse(body))

    // Pushes body to the browser
    // res.send(body)
    })
})
  
module.exports = router;

