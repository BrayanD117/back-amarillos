'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarjeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarjeta.belongsTo(models.Vehiculo, {
        foreignKey: 'idVehiculo'
      });

      Tarjeta.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario'
      });
    }
  }
  Tarjeta.init({
    idVehiculo: DataTypes.INTEGER,
    idUsuario: DataTypes.INTEGER,
    idTarifa: DataTypes.INTEGER,
    numero: DataTypes.STRING,
    emision: DataTypes.DATE,
    vence: DataTypes.DATE,
    refrendacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tarjeta',
  });
  return Tarjeta;
};