'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turno extends Model {
    static associate(models) {
      Turno.belongsTo(models.Vehiculo, {
        foreignKey: 'idVehiculo',
        as: 'vehiculo'
      });
      
      Turno.belongsTo(models.Persona, {
        foreignKey: 'idPersona',
        as: 'persona'
      });

      Turno.belongsTo(models.Estado, {
        foreignKey: 'idEstado',
        as: 'estado'
      });
    }
  }
  Turno.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    idVehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idVehiculo'
    },
    idPersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idPersona'
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idEstado'
    }
  }, {
    sequelize,
    modelName: 'Turno',
    tableName: 'Turnos',
    timestamps: true
  });
  return Turno;
};