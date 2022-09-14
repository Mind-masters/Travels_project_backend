// const middlewareOptions = require("../middleware/auth.middleware");
module.exports = function (app) {
  // Admin APIs

  // app.use("/admin", admin);

  // User

  // app.use("/user", user);

  // Client

  // app.use("/client", client);
  app.use("/client", require("./client/auth.router"));
};
