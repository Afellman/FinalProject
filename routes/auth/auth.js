// const router = require('express').Router();
// const authController = require('../../controllers/authController');
// const passport = require('passport')

// router.route('/register')
//   .get(authController.regFind)
//   .post(authController.regSave)

//   router.route('/login')
//     .get((req,res)=> {
//       console.log(req.user)
//       res.send({user: req.user})
//     })
//     .post(passport.authenticate('local'), authController.login)

// // router.post('/login',  , authController.login )

// module.exports = router;




const passport = require('passport');
const User = require('../../models/user');
const router = require('express').Router();

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  User.register(new User({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  console.log(req.user)
  res.send(req.user);
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log(req.body)
  console.log(req.user)
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;