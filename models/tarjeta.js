'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarjetas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarjetas.belongsTo(models.Vehiculo, {
        foreignKey: 'idVehiculo'
      });

      Tarjetas.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario'
      });
    }
  }
  Tarjetas.init({
    idVehiculo: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idTarifa: DataTypes.INTEGER,
    numero: DataTypes.STRING,
    emision: DataTypes.DATE,
    vence: DataTypes.DATE,
    refrendacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tarjetas',
  });
  return Tarjetas;
};