const express = require('express');
const AuthController = require('../../controllers/client/auth.controller');

const AuthRouter = express.Router()

AuthRouter.post('/auth/register', AuthController.register)
AuthRouter.post('/auth/login', AuthController.login)


module.exports = AuthRouter