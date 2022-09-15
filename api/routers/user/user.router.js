const express = require("express");
const UserController = require("../../controllers/user/user.controller");

const UserRouter = express.Router();

UserRouter.post("/me/update", UserController.updateProfile);
UserRouter.post("/me/status", UserController.changeUserAccountStatus);

module.exports = UserRouter;
