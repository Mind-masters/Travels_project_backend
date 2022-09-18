const express = require("express");
const PlacesController = require("../../controllers/client/places.controller");

const PlaceRouter = express.Router();

PlaceRouter.get("/places/all", PlacesController.getAll);

module.exports = PlaceRouter;
