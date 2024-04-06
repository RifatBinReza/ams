module.exports = (Sequelize, DataTypes) => {
  const Assessment = Sequelize.define(
    "assessment",
    {
      assessmentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "assessments",
    }
  );

  Assessment.associate = function (models) {
    Assessment.belongsTo(models.User, { foreignKey: 'createdBy' });
    Assessment.hasMany(models.Section, { foreignKey: 'assessmentId' });
    Assessment.hasMany(models.AssessmentAttempt, { foreignKey: 'assessmentId' });
  };

  return Assessment;
};
