const userModel = require("../../schemas/User");

class UserController {
  static async updateProfile(req, res) {
    let { firstName, lastName, phone, address, avatar, backgroundImage } =
      req.body;
    let data = {
      firstName,
      lastName,
      phone,
      address,
      avatar,
      backgroundImage,
    };
    try {
      const user = await userModel
        .findByIdAndUpdate(
          {
            _id: req.token.payload.id,
          },
          data,
          {
            new: true,
          }
        )
        .select(["-hash", "-salt"]);
      if (!user) return res.status(404).send("user-not-found");
      return res.status(200).send("user-updated-success");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async changeUserAccountStatus(req, res) {
    const data = {
      status: req.body.status,
    };
    try {
      const user = await userModel
        .findByIdAndUpdate(
          {
            _id: req.token.payload.id,
          },
          data,
          {
            new: true,
          }
        )
        .select(["-hash", "-salt"]);
      if (!user) return res.status(404).send("user-not-found");
      return res.status(200).send("user-status-changed");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}

module.exports = UserController;
