const placeModel = require("../../schemas/Place");
const userModel = require("../../schemas/User");

class Places {
  static async getAll(req, res) {
    try {
      const places = await placeModel.find({
        deleted: false,
      });
      res.status(200).send(places);
    } catch (err) {
      res.status(400).send(err);
    }
  }

}

module.exports = Places;
