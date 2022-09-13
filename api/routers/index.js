const middlewareOptions = require("../middleware/auth.middleware");
module.exports = function (app) {
  // Admin APIs

<<<<<<< HEAD
  // Client 
  app.use('/client', require('./client/auth.router'))
  app.use('/user', require('./client/places.router'))

=======
  app.use("/admin", middlewareOptions.admin);

  // User

  app.use("/user", middlewareOptions.user);

  // Client

  app.use("/client", middlewareOptions.client);
  app.use("/client", require("./client/auth.routers"));
>>>>>>> 62b5d5873850179a1a237e98c5103135449e5530
};
