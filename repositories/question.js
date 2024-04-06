const { models } = require("../models");

const questionRepository = () => {
  const create = (data) => {
    return models.Question.create(data);
  };

  // TODO: Add other CRUD operations

  return {
    create,
  };
};

module.exports = questionRepository();
