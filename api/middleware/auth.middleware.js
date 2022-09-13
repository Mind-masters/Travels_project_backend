const { expressjwt: jwt } = require("express-jwt");

const getTokenFromHeaders = function (req) {
  const { authorization } = req.headers;
  if (authorization && authorization.split(" ")[0] === "Bearer") {
    const token = authorization.split(" ")[1];
    req.token = token;
    return token;
  }
  return null;
};

const isRevokedCallbackClient = function (req, payload, done) {
  req.payload = payload;
  return done(null);
};
const isRevokedCallbackAdmin= function (req, payload, done) {
  req.payload = payload;
  if(!['admin'].includes(payload.role)){
    return done('Access denied')
  }
  return done(null);
};

const isRevokedCallbackUser= function (req, payload, done) {
  try {
    req.payload = payload;
    return done(null);
  } catch (error) {
    return done('has an error')
  }

};

// 2 options algorithms HS256/RS256
const middlewareOptions = {
  client: jwt({
    secret: process.env.CLIENT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    isRevoked: isRevokedCallbackClient,
    userProperty: "payload",
  }),
  user: jwt({
    secret: process.env.USER_SECRET,
    algorithms: ["HS256"],
    getToken: getTokenFromHeaders,
    isRevoked: isRevokedCallbackUser,
    userProperty: "payload",
  }),
  admin: jwt({
    secret: process.env.ADMIN_SECRET,
    algorithms: ["HS256"],
    getToken: getTokenFromHeaders,
    isRevoked: isRevokedCallbackClient,
    userProperty: "payload",
  }),
};

module.exports = middlewareOptions;
