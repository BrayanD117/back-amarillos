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
      TransportSecretary.belongsTo(models.City, {
        foreignKey: "cityId",
      });

      TransportSecretary.belongsTo(models.Status, {
        foreignKey: "statusId",
      });

      TransportSecretary.hasMany(models.Agreement, {
        foreignKey: "transportSecretaryId",
      });
    }
  }

  TransportSecretary.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Estados",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TransportSecretary",
    }
  );

  return TransportSecretary;
};
