module.exports = app => {
  const articles = require("../controllers/article.controller.js");
  const auth = require('../middlewares/auth');
  const isAdmin = require('../middlewares/isAdmin');

  // Create a new Article
  app.post("/articles", auth, articles.create);

  // Retrieve all Articles
  app.get("/articles", auth, articles.findAll);

  // Retrieve a single Article with articleId
  app.get("/articles/:articleId", auth, articles.findOne);

  // Update a Article with articleId
  app.put("/articles/:articleId", auth, articles.update);

  // Delete a Article with articleId
  app.delete("/articles/:articleId", auth, articles.delete);

  // Delete all Article
  app.delete("/articles", isAdmin, articles.deleteAll);
};