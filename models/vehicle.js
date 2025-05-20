'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.belongsTo(models.Status, { foreignKey: 'statusId' });
      Vehicle.belongsTo(models.Service, { foreignKey: 'serviceId' });
      Vehicle.belongsTo(models.Fuel, { foreignKey: 'fuelId' });
      Vehicle.belongsTo(models.TransportSecretary, { foreignKey: 'transportSecretaryId' });
      Vehicle.belongsTo(models.Company, { foreignKey: 'companyId' });

      Vehicle.hasMany(models.Control, { foreignKey: 'vehicleId' });
      Vehicle.hasMany(models.Requirement, { foreignKey: 'vehicleId' });
    }
  }
  Vehicle.init({
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    internalNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    line: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cylinderCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    vehicleClass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bodyType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fuelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    engine: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chassis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    importation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    importDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    doors: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    transportSecretaryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Vehicle'
  });
  return Vehicle;
};