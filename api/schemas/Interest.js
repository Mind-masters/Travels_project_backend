const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      require:true
    },
    value: {
      type: String,
      require:true
    },
  },
);

interestSchema.methods.jsonData = function () {
  return {
    key: this.key,
    value: this.value,
  };
};
interestSchema.pre(/'updateOne | findOneAndUpdate'/, function (next) {
  this.set({
    updatedAt: new Date().toLocaleString(),
  });
  next();
});

const interestModel = mongoose.model("interest", interestSchema, "interest");

module.exports = interestModel;
