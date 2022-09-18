const placeModel = require("../../schemas/Place");
const userModel = require("../../schemas/User");

class Places {
  static async getAll(req, res) {
    console.log(Math.round(new Date().getTime()/ 100))
    try {
      const places = await placeModel.find({
        user_id: req.payload.id,
        deleted: false,
      });
      res.status(200).send(places.jsonData());
    } catch (err) {
      res.status(400).send(err);
    }
  }

}

module.exports = Places;
