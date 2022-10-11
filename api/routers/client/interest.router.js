const express = require("express");
const InterestController = require("../../controllers/admin/interest.controller");

const InterestRouter = express.Router();

InterestRouter.get("/interests", InterestController.getAll);

module.exports = InterestRouter;
