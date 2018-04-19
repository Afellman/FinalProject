const passport = require('passport');
const db = require('../../models/');
const router = require('express').Router();
const controller = require('../../controllers/museumController')

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/one:id', controller.findAll)

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  
  db.User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

  

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  
  res.send(req.user);
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;