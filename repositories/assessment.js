const { models } = require("../models");

const assessmentRepository = () => {
  const create = (data) => {
    return models.Assessment.create(data);
  };

  const findById = (id) => {
    return models.Assessment.findOne({
      where: {
        assessmentId: id,
      },
      include: [
        {
          model: models.Section,
          include: [
            {
              model: models.Question,
              include: [models.Option],
            },
          ],
        },
      ],
    });
  };

  const findAll = () => {
    return models.Assessment.findAll({
      include: [
        {
          model: models.Section,
          include: [
            {
              model: models.Question,
              include: [models.Option],
            },
          ],
        },
      ],
    });
  };

  const update = async (data) => {
    const assessment = await models.Assessment.findOne({
      where: {
        assessmentId: id,
      },
    });
    if (!assessment) {
      throw new Error('assessment not found.')
    }
    return await assessment.update(data);
  };

  const remove = (id) => {
    return models.Assessment.destroy({
      where: {
        assessmentId: id,
      },
    });
  };

  return {
    create,
    findById,
    findAll,
    update,
    remove,
  };
};

module.exports = assessmentRepository();
