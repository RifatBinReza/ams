const { models } = require("../models");

const optionRepository = () => {
  const create = (data) => {
    return models.Option.create(data);
  };

  // TODO: Add other CRUD operations

  return {
    create,
  };
};

module.exports = optionRepository();
