const bcrypt = require("bcrypt");

exports.hash = async function (text) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(text, salt);
};