const bcrypt = require("bcrypt");

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "student"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      password: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "users",
      timestamps: true,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      }
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Assessment, { foreignKey: 'createdBy' });
    User.hasMany(models.AssessmentAttempt, { foreignKey: 'userId' });
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};
