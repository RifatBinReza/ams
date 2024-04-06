module.exports = (Sequelize, DataTypes) => {
  const Option = Sequelize.define(
    "option",
    {
      optionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "options",
    }
  );

  Option.associate = function (models) {
    Option.belongsTo(models.Question, { foreignKey: 'questionId' });
    Option.hasMany(models.Answer, { foreignKey: 'optionId' });
  };

  return Option;
};
