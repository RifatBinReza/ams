module.exports = (Sequelize, DataTypes) => {
  const AssessmentAttempt = Sequelize.define(
    "assessmentAttempt",
    {
      attemptId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "assessment_attempts",
      timestamps: true,
    }
  );

  AssessmentAttempt.associate = function (models) {
    AssessmentAttempt.belongsTo(models.User, { foreignKey: 'userId' });
    AssessmentAttempt.belongsTo(models.Assessment, { foreignKey: 'assessmentId' });
    AssessmentAttempt.hasMany(models.Answer, { foreignKey: 'attemptId' });
  };

  return AssessmentAttempt;
};
