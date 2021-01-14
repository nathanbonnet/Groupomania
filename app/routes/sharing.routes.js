module.exports = app => {
  const sharings = require("../controllers/sharing.controller.js");
  const auth = require('../middlewares/auth');

  // Create a new Sharing
  app.post("/sharings", auth, sharings.create);

  // Retrieve all Sharings
  app.get("/sharings", auth, sharings.findAll);

  // Retrieve a single Sharing with sharingId
  app.get("/sharings/:sharingId", auth, sharings.findOne);

  // Update a Sharing with sharingId
  app.put("/sharings/:sharingId", auth, sharings.update);

  // Delete a Sharing with sharingId
  app.delete("/sharings/:sharingId", auth, sharings.delete);

  // Delete all Sharing
  app.delete("/sharings", auth, sharings.deleteAll);
};