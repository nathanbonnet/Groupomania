module.exports = app => {
  const sharings = require("../controllers/sharing.controller.js");
  const auth = require('../middlewares/auth');
  const isAdmin = require("../middlewares/isAdmin.js");

  // Create a new Sharing
  app.post("/sharings", auth, sharings.create);

  // Retrieve all Sharings
  app.get("/sharings", auth, sharings.findAll);

  // Retrieve all Articles of the authenticated
  app.get("/my_sharings", auth, sharings.findAllByUser);

  // Retrieve all Sharings by article
  app.get("/articles/:id/sharings", auth, sharings.findAllByArticle);

  // Retrieve a single Sharing with sharingId
  app.get("/sharings/:sharingId", auth, sharings.findOne);

  // Delete a Sharing with sharingId
  app.delete("/sharings/:sharingId", isAdmin, sharings.delete);

  // Delete all Sharing
  app.delete("/sharings", isAdmin, sharings.deleteAll);
};