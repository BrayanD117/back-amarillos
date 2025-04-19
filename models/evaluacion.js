'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluacion extends Model {

    static associate(models) {
      Evaluacion.belongsTo(models.Calificacion, {
        foreignKey: 'idCalificacion',
        as: 'calificacion'
      });
      Evaluacion.belongsTo(models.Vehiculo, {
        foreignKey: 'idVehiculo',
        as: 'vehiculo'
      });
      
      Evaluacion.belongsTo(models.Persona, {
        foreignKey: 'idPersona',
        as: 'persona'
      });
    }
  }
  Evaluacion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    idVehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idPersona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCalificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    observacion: {
      type: DataTypes.STRING(500),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Evaluacion',
    tableName: 'Evaluaciones',
    timestamps: true
  });
  return Evaluacion;
};