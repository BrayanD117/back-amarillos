'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.belongsTo(models.Vehiculo, {
        foreignKey: 'vehicleId',
        as: 'vehicle'
      });
      
      Shift.belongsTo(models.Persona, {
        foreignKey: 'personId',
        as: 'person'
      });

      Shift.belongsTo(models.Status, {
        foreignKey: 'statusId',
        as: 'status'
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