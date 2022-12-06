const placeModel = require("../../schemas/Place");
const userModel = require("../../schemas/User");

class Places {
  static async create(req, res) {
    const { title, image, description, location } = req.body;
    console.log("payload: ", req.payload.id);
    try {
      const user = await userModel.findOne({
        _id: req.payload.id,
      });
      if (!user) return res.status(404).send({ error: "user-not-found" });
      const createdPlace = new placeModel({
        title,
        description,
        image,
        location,
        user_id: user._id,
      });
      return createdPlace
        .save()
        .then((place) => {
          return res.status(200).send("place created successful");
        })
        .catch((err) => {
          res.statusMessage = err._message || "Something went wrong";
          res.status(400).end();
        });
    } catch (err) {
      console.log("error: ", err);
      res.statusMessage = err || "Something went wrong";
      res.status(400).end();
    }
  }

  static async update(req, res) {
    const { place_id } = req.params;
    const { title, description, image, address, location } = req.body;
    const data = {
      title,
      description,
      image,
      address,
      location,
    };

    try {
      const place = await placeModel.findByIdAndUpdate(
        {
          _id: place_id,
          user_id: req.payload.id,
        },
        data,
        {
          new: true,
        }
      );

      if (!place) return res.status(404).send("place-not-found");
      return res.status(200).send("place-updated-success");
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

  static async delete(req, res) {
    const { place_id } = req.params;

    try {
      const place = await placeModel.findByIdAndUpdate(
        {
          _id: place_id,
          user_id: req.payload.id,
          deleted: false,
        },
        {
          deleted: true,
        },
        {
          new: true,
        }
      );

      if (!place) return res.status(404).send("place-not-found");
      return res.status(200).send("place-delete-success");
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }
}

module.exports = Places;
