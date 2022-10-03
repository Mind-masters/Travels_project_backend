const AuthModule = require("../../modules/auth");
const UserModel = require("../../schemas/User");
const { register, login } = require("../../validations/auth");
const jwt = require("jsonwebtoken");
class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password , isAccepted} = req.body;
      await register.validateAsync(req.body);
      let user_model = new UserModel({
        name,
        email: email.trim().toLowerCase(),
        isAccepted
      });
      user_model.setPassword(password);

      return user_model
        .save()
        .then((user) => {
          if (user) {
            let token = AuthController.generateToken({
              id: user._id,
              email: user.email,
              status: user.status,
            });
            return token;
          }
        })
        .then((token) => res.status(200).send({ status: "success", ...token }))
        .catch((error) => res.status(422).send({ error }));
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

      await login.validateAsync(req.body);
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
    const options = { expiresIn: "2h" };
    let access_token = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options
    );

    let refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
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
