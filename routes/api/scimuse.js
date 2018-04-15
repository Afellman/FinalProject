const router = require('express').Router();

var request = require('request');

router.post('/post', function(req, res) {
  
  request({
    url:`http://collection.sciencemuseum.org.uk/search/objects/images/categories/${req.body.category}?random=10`,
    method: "GET",
    headers: {
      'crossdomain': 'true',
      "accept": "application/json ",
      'Content-Type': 'application/json',
    }
  }, (error, response, body) => {


    // Pushes body to the browser
    res.send(body)
    })
})
  
module.exports = router;

