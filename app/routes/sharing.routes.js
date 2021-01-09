module.exports = app => {
  const sharings = require("../controllers/sharing.controller.js");

  // Create a new Sharing
  app.post("/sharings", sharings.create);

  // Retrieve all Sharings
  app.get("/sharings", sharings.findAll);

  // Retrieve a single Sharing with sharingId
  app.get("/sharings/:sharingId", sharings.findOne);

  // Update a Sharing with sharingId
  app.put("/sharings/:sharingId", sharings.update);

  // Delete a Sharing with sharingId
  app.delete("/sharings/:sharingId", sharings.delete);

  // Create a new Sharing
  app.delete("/sharings", sharings.deleteAll);
};