module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const auth = require('../middlewares/auth');
  const isAdmin = require('../middlewares/isAdmin');
  const ownerUser = require('../middlewares/ownerUser');


  // login
  app.post("/users/login", users.login);

  // Create a new User
  app.post("/users", users.create);

  // Retrieve all Users
  app.get("/users", isAdmin, users.findAll);

  // Retrieve a single User with userId
  app.get("/users/:userId", ownerUser, users.findOne);

  // Update a User with userId
  app.put("/users/:userId", ownerUser, users.update);

  // Delete a User with userId
  app.delete("/users/:userId", ownerUser, users.delete);

  // Delete all User
  app.delete("/users", isAdmin, users.deleteAll);
};