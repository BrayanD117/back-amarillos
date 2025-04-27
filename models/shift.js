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
      
      Shift.belongsTo(models.Person, {
        foreignKey: 'personId',
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
      allowNull: false,
      field: 'vehicleId'
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'personId'
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'statusId'
    }
  }, {
    sequelize,
    modelName: 'Shift',
  });
  return Shift;
};