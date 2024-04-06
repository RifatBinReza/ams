module.exports = (Sequelize, DataTypes) => {
  const Answer = Sequelize.define(
    "answer",
    {
      answerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "answers",
    }
  );

  Answer.associate = function (models) {
    Answer.belongsTo(models.AssessmentAttempt, { foreignKey: 'attemptId' });
    Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
    Answer.belongsTo(models.Option, { foreignKey: 'optionId' });
  };

  return Answer;
};
