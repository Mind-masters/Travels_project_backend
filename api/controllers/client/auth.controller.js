const AuthModule = require("../../modules/auth");
const UserModel = require("../../schemas/User");
const { register, login } = require("../../validations/auth");
const jwt = require("jsonwebtoken");
class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      await register.validateAsync(req.body);
      let user_model = new UserModel({
        name,
        email: email.trim().toLowerCase(),
      });
      user_model.setPassword(password);

      return user_model
        .save()
        .then((user) => {
          if (user)
            return res.status(200).send({ success: "register-success" });
        })
        .catch((error) => res.status(422).send({ error: "email-exited" }));
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async login(req, res) {
    try {
      const existing_user = await UserModel.findOne({
        email: req.body.email.trim().toLowerCase(),
      });

      if (!existing_user)
        return res.status(404).send({ error: "user-not-found" });

      // await login.validateAsync(req.body);
      if (!existing_user.validatePassword(req.body.password))
        return res.status(400).send({ error: "user-incorrect-password" });
      if (existing_user.status !== "active")
        return res.status(400).send({ error: "user-account-inactive" });
      let token = await AuthController.generateToken({
        id: existing_user._id,
        email: existing_user.email,
        status: existing_user.status,
      });
      return res.status(200).send({ status: "success", ...token });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  static async generateToken(payload) {
    let expiresIn = "2h";
    const options = { expiresIn };
    let refresh_token;
    let access_token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options
    );

    refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "365d",
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
