const express = require("express");
const PlacesController = require("../../controllers/client/places.controller");

const PlaceRouter = express.Router();

PlaceRouter.get("/places/all", PlacesController.getAll);
PlaceRouter.post("/places/new", PlacesController.create);
PlaceRouter.post("/places/change/:place_id", PlacesController.update);
PlaceRouter.post("/places/delete/:place_id", PlacesController.delete);

module.exports = PlaceRouter;
