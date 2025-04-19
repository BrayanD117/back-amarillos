'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Convenio extends Model {
    static associate(models) {

    }
  }
  Convenio.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'Id_Convenio'
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'Nombre'
    },
    kilometro: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'Kilometro'
    }
  }, {
    sequelize,
    modelName: 'Convenio',
    tableName: 'Convenios',
    timestamps: true
  });
  return Convenio;
};