"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TransportSecretary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransportSecretary.belongsTo(models.City, { foreignKey: "cityId" });
      TransportSecretary.belongsTo(models.Status, { foreignKey: "statusId"});

      TransportSecretary.hasMany(models.Agreement, { foreignKey: "transportSecretaryId" });
      TransportSecretary.hasMany(models.Company, { foreignKey: "transportSecretaryId" });
      TransportSecretary.hasMany(models.Surcharge, { foreignKey: "transportSecretaryId" });
      TransportSecretary.hasMany(models.Person, { foreignKey: "transportSecretaryId" });
      TransportSecretary.hasMany(models.Vehicle, { foreignKey: "transportSecretaryId" });
      TransportSecretary.hasMany(models.Fare, { foreignKey: "transportSecretaryId" });
    }
  }

  TransportSecretary.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "TransportSecretary",
    }
  );
  return TransportSecretary;
};
