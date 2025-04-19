'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calificacion extends Model {
    static associate(models) {
      Calificacion.hasMany(models.Evaluacion, {
        foreignKey: 'id',
        as: 'evaluaciones'
      });
    }
  }
  Calificacion.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    calificacion: {
      type: DataTypes.STRING(200),
      allowNull: false,    }
  }, {
    sequelize,
    modelName: 'Calificacion',
    tableName: 'Calificaciones',
    timestamps: true
  });
  return Calificacion;
};