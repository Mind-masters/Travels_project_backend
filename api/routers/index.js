module.exports = function (app) {

  // Client 
  app.use('/client', require('./client/auth.router'))
};
