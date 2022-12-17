const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("ragister", Schema);
