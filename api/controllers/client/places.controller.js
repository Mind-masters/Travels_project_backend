const placeModel = require("../../schemas/Place");
const userModel = require("../../schemas/User");

class Places {
  static async getAll(req, res) {
    // console.log("ok: ",  req.payload.id)
    console.log(Math.round(new Date().getTime()/ 100))
    try {
      const places = await placeModel.find({
        // user_id: req.payload.id,
        deleted: false,
      });

      console.log("places: ", places)
      res.status(200).send(places);
    } catch (err) {
      res.status(400).send(err);
    }
  }

}

module.exports = Places;
