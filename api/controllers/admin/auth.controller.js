const adminModel = require("../../schemas/Admin");
const { register, login } = require("../../validations/auth");
const jwt = require("jsonwebtoken");
class AuthController {
  static async register(req, res) {
    console.log(req.body)
    try {
      const { name, email, password } = req.body;

      await register.validateAsync(req.body);
      let admin_model = new adminModel({
        email: email.trim().toLowerCase(),
        name
      });
      admin_model.setPassword(password);

      return admin_model
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
      const existing_admin = await adminModel.findOne({
        email: req.body.email.trim().toLowerCase(),
        status: "active",
        role: "admin",
      });

      if (!existing_admin)
        return res.status(404).send({ error: "user-not-found" });

      await login.validateAsync(req.body);
      if (!existing_admin.validatePassword(req.body.password))
        return res.status(400).send({ error: "user-incorrect-password" });
      if (existing_admin.status !== "active")
        return res.status(400).send({ error: "user-account-inactive" });

      let token = await AuthController.generateToken({
        id: existing_admin._id,
        email: existing_admin.email,
        status: existing_admin.status,
        role: existing_admin.role,
      });
      const data = existing_admin.jsonData();
      return res.status(200).send({ status: "success", data, token });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  static async generateToken(payload) {
    const options = { expiresIn: "2h" };
    let access_token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, options);

    let refresh_token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, {
      expiresIn: "1d",
    });
    await adminModel.findByIdAndUpdate(
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
  