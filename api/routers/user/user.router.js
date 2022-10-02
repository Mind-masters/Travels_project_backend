const express = require("express");
const UserController = require("../../controllers/user/user.controller");

const UserRouter = express.Router();

UserRouter.get("/me/profile", UserController.getUserProfile);
UserRouter.put("/me/update", UserController.updateProfile);
UserRouter.put("/me/status", UserController.changeUserAccountStatus);

module.exports = UserRouter;
