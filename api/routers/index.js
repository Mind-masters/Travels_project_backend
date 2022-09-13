module.exports = function (app) {

  // Client 
  app.use('/client', require('./client/auth.router'))
  app.use('/client', require('./client/places.router'))

};
