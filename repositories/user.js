const { models } = require("../models");

const userRepository = () => {
  const findByEmail = (email) => {
    return models.User.findOne({
      where: {
        email: email,
      }
    });
  };

  return {
    findByEmail,
  };
};

module.exports = userRepository();
