const interestModel = require("../../schemas/Interest");
class InterestController {
  static async getAll(req, res) {
    try {
      const data = await interestModel.find();
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  static async create(req, res) {
    const { key, value } = req.body;
    try {
      const interest_model = new interestModel({
        key,
        value,
      });

      return interest_model
        .save()
        .then(() => res.status(200).json({ status: "success" }))
        .catch((error) => res.status(422).send({ error }));
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    console.log(req.params.id)
    try {
      return interestModel
        .findByIdAndUpdate(
          {
            _id: req.params.id,
          },
          req.body,
          {
            new: true,
          }
        )
        .then(() =>
          res.status(200).json({ status: "updated interest success" })
        )
        .catch((error) => res.status(422).send({ error }));
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async delete(req, res) {
    try {
      return interestModel
        .findByIdAndDelete({
          _id: req.params.id,
        })
        .then(() =>
          res.status(200).json({ status: "deleted interest success" })
        )
        .catch((error) => res.status(422).send({ error }));
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = InterestController;
