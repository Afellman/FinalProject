const db = require("../models");

// Defining methods for the museumController
module.exports = {
    findAll: function(req, res) {
      db.Saved
        .find({user: req.params.id})
        .sort({ date: -1 })
        .then(dbModel => {
          res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      db.Saved
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      console.log(req.body)
        const Saved = {
            title: req.body.museumObj.name,
            description: req.body.museumObj.description,
            img: req.body.museumObj.img,
            url: req.body.museumObj.link,
            user: req.body.museumObj.user
        }
        console.log(Saved)
      db.Saved
        .create(Saved)
        .then(dbModel => {
          console.log('article Saved')
          res.json(dbModel)
          
        })
        .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
      db.Saved
        .findOneAndUpdate({ id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      db.Saved
        .findById({ id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  };