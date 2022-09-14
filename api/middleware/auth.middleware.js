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

const isRevokedCallbackClient = async function (req, token) {
  req.token = token;
  return true;
};
const isRevokedCallbackAdmin = async function (req, token,done) {
  try {
    req.token = token;
    return token === "undefined" && !["admin"].includes(token.payload.ole);
  } catch (error) {
    return done("has an error");
  }
};

const isRevokedCallbackUser = async function (req, token, done) {
  try {
    req.token = token;
    return token === "undefined";
  } catch (error) {
    return done("has an error");
  }
};


// 2 options algorithms HS256/RS256
const middlewareOptions = {
  client: jwt({
    secret: process.env.USER_SECRET,
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
    isRevoked: isRevokedCallbackAdmin,
    userProperty: "payload",
  }),
};

module.exports = middlewareOptions;
