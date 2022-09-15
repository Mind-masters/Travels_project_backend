const middlewareOptions = require("../middleware/auth.middleware");

module.exports = function (app) {

  // Admin APIs
  app.use("/admin", middlewareOptions.admin);

  // User
  app.use("/user", middlewareOptions.user);

  // Client
  app.use("/client", middlewareOptions.client, require("./client/places.router"));

};
