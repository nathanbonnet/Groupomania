module.exports = app => {
  const articles = require("../controllers/article.controller.js");
  const auth = require('../middlewares/auth');
  const isAdmin = require('../middlewares/isAdmin');
  const ownerArticle = require('../middlewares/ownerArticle');

  // Create a new Article
  app.post("/articles", auth, articles.create);

  // Retrieve all Articles
  app.get("/articles", auth, articles.findAll);

  // Retrieve a single Article with articleId
  app.get("/articles/:articleId", auth, articles.findOne);

  // Update a Article with articleId
  app.put("/articles/:articleId", auth, ownerArticle, articles.update);

  // Delete a Article with articleId
  app.delete("/articles/:articleId", auth, ownerArticle, articles.delete);

  // Delete all Article
  app.delete("/articles", isAdmin, articles.deleteAll);
};