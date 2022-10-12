const UserModel = require("../../schemas/User");
const { register, login } = require("../../validations/auth");
const jwt = require("jsonwebtoken");
const settingModel = require("../../schemas/Setting");
const Helpers = require("../../../plugins/helpers");
class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password, isAccepted } = req.body;

      await register.validateAsync(req.body);
      const setting = await settingModel.create({
        following_travelers: false,
        show_location: false,
      });
      let user_model = new UserModel({
        name,
        email: email.trim().toLowerCase(),
        isAccepted,
        role: "user",
        setting: setting._id,
      });

      user_model.setPassword(password);

      return user_model
        .save()
        .then(async (user) => {
          if (user) {
            let token = await AuthController.generateToken({
              id: user._id,
              email: user.email,
              status: user.status,
              role: user.role,
            });

            const data = user.jsonData();

            return {
              token,
              data,
            };
          }
        })
        .then((data) => {
          return res.status(200).send({ status: "success", ...data });
        })
        .catch((error) => res.status(422).send({ error }));
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async login(req, res) {
    try {
      const existing_user = await UserModel.findOne({
        email: req.body.email.trim().toLowerCase(),
        verify: true,
        role: "user",
      }).populate("setting");

      if (!existing_user)
        return res.status(404).send({ error: "user-not-found" });

      await login.validateAsync(req.body);
      if (!existing_user.validatePassword(req.body.password))
        return res.status(400).send({ error: "user-incorrect-password" });

      if (existing_user.status !== "active")
        return res.status(400).send({ error: "user-account-inactive" });
      if (!existing_user.verify)
        return res.status(400).send({ error: "user-account-not-verify" });
      let new_login = await Helpers.checkDate(existing_user.last_in_logged);
      let points = new_login
        ? (existing_user.points += 1)
        : existing_user.points;
      await UserModel.findByIdAndUpdate(
        {
          _id: existing_user._id,
        },
        {
          last_in_logged: new Date().toLocaleString(),
          points,
        },
        {
          new: true,
        }
      );
      let token = await AuthController.generateToken({
        id: existing_user._id,
        email: existing_user.email,
        status: existing_user.status,
        role: existing_user.role,
      });
      const data = existing_user.jsonData();
      return res.status(200).send({ status: "success", data, token });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  static async generateToken(payload) {
    const options = { expiresIn: "2h" };
    let access_token = jwt.sign(payload, process.env.JWT_USER_SECRET, options);

    let refresh_token = jwt.sign(payload, process.env.JWT_USER_SECRET, {
      expiresIn: "7d",
    });
    await UserModel.findByIdAndUpdate(
      {
        _id: payload.id,
      },
      {
        refresh_token,
        access_token,
      },
      {
        new: true,
      }
    );
    return {
      access_token,
      refresh_token,
    };
  }
  static async refreshToken(req, res) {}
}

module.exports = AuthController;
