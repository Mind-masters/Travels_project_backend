const express = require("express");
const AdminController = require("../../controllers/admin/auth.controller");

const AdminRouter = express.Router();

AdminRouter.post("/auth/register", AdminController.register);
AdminRouter.post("/auth/login", AdminController.login);

module.exports = AdminRouter;
