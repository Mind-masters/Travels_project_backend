const AuthModule = require("../../modules/auth");
const UserModel = require("../../schemas/User");
const { register, login } = require("../../validations/auth");
const jwt = require("jsonwebtoken");
class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      await register.validateAsync(req.body);
      let user_model = new UserModel({
        email,
        password,
      });
      user_model.setPassword(password);

      return user_model
        .save()
        .then((user) => {
          return res.status(200).send({ success: "register-success" });
        })
        .catch((error) => res.status(422).send({ error: "email-exited" }));
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async login(req, res) {
    try {
      console.log(req.body)
      const existing_user = await UserModel.findOne({
        email: req.body.email,
      });

      if (!existing_user)
        return res.status(404).send({ error: "user-not-found" });

      if (!existing_user.validatePassword(req.body.password))
        return res.status(400).send({ error: "user-incorrect-password" });

      let token = await AuthController.generateToken(
        {
          id: existing_user._id,
          email: existing_user.email,
        },
        existing_user.remember
      );
      const data = existing_user.jsonData();
      data.token = token;
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
  static async generateToken(payload, remember = false) {
    let expiresIn = "1d";
    if (remember) expiresIn = "365d";
    const secret = process.env.SECRET;
    const options = { expiresIn };

    const token = jwt.sign(payload, secret, options);
    return token;
  }
}

module.exports = AuthController;
