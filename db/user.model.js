const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: String,
  email: String,
});

module.exports = mongoose.model("User", UserSchema);
