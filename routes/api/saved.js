const router = require('express').Router();
const museumController = require('../../controllers/museumController');

router.route('/articles')
  .get(museumController.findAll)
  .post(museumController.create)
  .delete(museumController.remove)
  
module.exports = router;