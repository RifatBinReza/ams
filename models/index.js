const Sequelize = require("sequelize");
/**
 * Connect to the database instance
 */
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
  }
);

/**
 * Get all the models for exporting
 */
const models = {
  User: require("./User")(sequelize, Sequelize),
  Assessment: require("./Assessment")(sequelize, Sequelize),
  AssessmentAttempt: require("./AssessmentAttempt")(sequelize, Sequelize),
  Option: require("./Option")(sequelize, Sequelize),
  Question: require("./Question")(sequelize, Sequelize),
  Section: require("./Section")(sequelize, Sequelize),
  Answer: require("./Answer")(sequelize, Sequelize),
};

/**
 * Loop through all the models and associate the defined relationships
 * TODO: In each models, add oncascade delete options
 */
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, models };
