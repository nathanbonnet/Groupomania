const Sharing = require("../models/sharing.model.js");
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const token = req.headers.authorization.split(" ")[1];
    const {userId} = jwt.verify(token,'RANDOM_TOKEN_SECRET');

    // Create a Sharing
    const sharing = new Sharing({
      content : req.body.content,
      articles_id : req.body.articles_id,
      users_id : userId
    });
  
    // Save Sharing in the database
    Sharing.create(sharing, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Sharing."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Sharing.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving sharings."
        });
      else res.send(data);
    });
};

exports.findAllByArticle = (req, res) => {
  Sharing.getAllByArticle(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    else res.send(data);
  });
}

exports.findAllByUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const {userId} = jwt.verify(token,'RANDOM_TOKEN_SECRET');
  Sharing.getAllByOwner(userId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    else res.send(data);
  });
}


exports.findOne = (req, res) => {
    Sharing.findById(req.params.sharingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sharing with id ${req.params.sharingId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Sharing with id " + req.params.sharingId
          });
        }
      } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Sharing.updateById(
      req.params.sharingId,
      new Sharing(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Sharing with id ${req.params.sharingId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Sharing with id " + req.params.sharingId
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    Sharing.remove(req.params.sharingId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Sharing with id ${req.params.sharingId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Sharing with id " + req.params.sharingId
          });
        }
      } else res.send({ message: `Sharing was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Sharing.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all sharings."
        });
      else res.send({ message: `All Sharings were deleted successfully!` });
    });
};