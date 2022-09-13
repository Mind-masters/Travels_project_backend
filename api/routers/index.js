module.exports = function (app) {

  // Client 
  app.use('/client', require('./client/auth.router'))
  app.use('/user', require('./client/places.router'))

};
