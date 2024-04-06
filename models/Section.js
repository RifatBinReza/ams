module.exports = (Sequelize, DataTypes) => {
  const Section = Sequelize.define(
    "section",
    {
      sectionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      tableName: "sections",
      timestamps: true
    }
  );

  Section.associate = function (models) {
    Section.belongsTo(models.Assessment, { foreignKey: 'assessmentId' });
    Section.hasMany(models.Question, { foreignKey: 'sectionId' });
  };

  return Section;
};
