const middlewareOptions = require("../middleware/auth.middleware");

module.exports = function (app) {

  // Admin APIs
  app.use("/admin", middlewareOptions.admin);

  // User
  app.use("/user", middlewareOptions.user);

  // Client
  
  // app.use("/client", client);
  app.use("/client", middlewareOptions.client);
  app.use("/client", require("./client/auth.router"));
  // User

  app.use("/user", middlewareOptions.user);
  app.use("/user", require("./user/user.router"));
  app.use("/user", require("./user/places.router"));
};
