const express = require("express");
const PlacesController = require("../../controllers/user/places.controller");

const PlaceRouter = express.Router();

PlaceRouter.post("/places/new", PlacesController.create);
PlaceRouter.post("/places/change/:place_id", PlacesController.update);
PlaceRouter.post("/places/delete/:place_id", PlacesController.delete);

module.exports = PlaceRouter;
