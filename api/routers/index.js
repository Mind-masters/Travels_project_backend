const middlewareOptions = require("../middleware/auth.middleware");

module.exports = function (app) {

  // Admin APIs
  app.use("/admin", require("./admin/auth.router"));
  app.use("/admin", middlewareOptions.admin);
  app.use("/admin", require("./admin/interest.router"));

  // Client
  
  app.use("/client", require("./client/auth.router"));
  app.use("/client", require("./client/places.router"));
  app.use("/client", require("./client/interest.router"));

  // User

  app.use("/user", middlewareOptions.user);
  app.use("/user", require("./user/auth.router"));
  app.use("/user", require("./user/places.router"));
  app.use("/user", require("./user/upload.router"));
};
