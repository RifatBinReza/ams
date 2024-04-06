const { models } = require("../models");

const sectionRepository = () => {
  const create = (data) => {
    return models.Section.create(data);
  };

  // TODO: Add other CRUD operations

  return {
    create,
  };
};

module.exports = sectionRepository();
