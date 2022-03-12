const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {type: String},
  model: {type: String}
});

module.exports = mongoose.model("Cars", carSchema);