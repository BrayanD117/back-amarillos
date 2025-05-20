'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.belongsTo(models.User, { foreignKey: 'userId' });
      Driver.belongsTo(models.BloodType, { foreignKey: 'bloodTypeId' });
      Driver.belongsTo(models.LicenseCategory, { foreignKey: 'licenseCategoryId' });

      Driver.hasMany(models.Control, { foreignKey: 'driverId' });
    }
  }
  Driver.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bloodTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rhFactor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthInsurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workInsurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licenseCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};