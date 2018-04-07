const db = require('../models')

module.exports = {
  regFind: (req, res) => {
    console.log('regFind')
    db.User.findOne({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  regSave: (req, res) => {
    db.User.register(new db.User({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    });
  },
  login: (req, res) => {
      console.log(req.body)
      res.redirect('/');
  }
}





