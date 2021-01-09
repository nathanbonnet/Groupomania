const Article = require("../models/article.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Article
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      users_id: req.body.users_id,
    });
  
    // Save Article in the database
    Article.create(article, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Article."
        });
      else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Article.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving articles."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Article.findById(req.params.articleId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Article with id ${req.params.articleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Article with id " + req.params.articleId
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
  
    Article.updateById(
      req.params.articleId,
      new Article(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Article with id ${req.params.articleId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Article with id " + req.params.articleId
            });
          }
        } else res.send(data);
      }
    );
};

exports.delete = (req, res) => {
    Article.remove(req.params.articleId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Article with id ${req.params.articleId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Article with id " + req.params.articleId
          });
        }
      } else res.send({ message: `Article was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Article.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all articles."
        });
      else res.send({ message: `All Articles were deleted successfully!` });
    });
};