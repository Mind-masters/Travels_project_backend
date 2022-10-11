const express = require("express");
const InterestController = require("../../controllers/admin/interest.controller");

const InterestRouter = express.Router();

InterestRouter.post("/interest/create", InterestController.create);
InterestRouter.put("/interest/update/:id", InterestController.update);
InterestRouter.delete("/interest/delete/:id", InterestController.delete);

module.exports = InterestRouter;
