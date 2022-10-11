const express = require("express");
const UserController = require("../../controllers/user/user.controller");

const UserRouter = express.Router();

UserRouter.get("/me/profile", UserController.getUserProfile);
UserRouter.patch("/me/update", UserController.updateProfile);
UserRouter.patch("/me/status", UserController.changeUserAccountStatus);
UserRouter.patch("/me/setting", UserController.changeSetting);

module.exports = UserRouter;
