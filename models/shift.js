'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.belongsTo(models.Vehicle, {
        foreignKey: 'vehicleId',
      });
      
      Shift.belongsTo(models.Driver, {
        foreignKey: 'driverId',
      });

      Shift.belongsTo(models.Status, {
        foreignKey: 'statusId',
      });
    }
  }
  Shift.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Shift'
  });
  return Shift;
};