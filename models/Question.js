module.exports = (Sequelize, DataTypes) => {
  const Question = Sequelize.define(
    "question",
    {
      questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("MCQ", "MSQ"),
      }
    },
    {
      freezeTableName: true,
      tableName: "questions",
      timestamps: true
    }
  );

  Question.associate = function (models) {
    Question.belongsTo(models.Section, { foreignKey: 'sectionId' });
    Question.hasMany(models.Option, { foreignKey: 'questionId' });
    Question.hasMany(models.Answer, { foreignKey: 'questionId' });
  };

  return Question;
};
