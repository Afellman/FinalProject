const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport')

router.route('/register')
  .get(authController.regFind)
  .post(authController.regSave)

  router.route('/login')
    .post(passport.authenticate('local'), authController.login)

// router.post('/login',  , authController.login )

module.exports = router;

