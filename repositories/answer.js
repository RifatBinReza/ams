const { models } = require("../models");

const answerRepository = () => {
  const create = (data) => {
    return models.Answer.create(data);
  };

  // TODO: Add other CRUD operations

  return {
    create,
  };
};

module.exports = answerRepository();
