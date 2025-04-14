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

      Tarjetas.belongsTo(models.Tarifa, {
        foreignKey: 'idTarifa'
      });
    }
  }
  Tarjetas.init({
    idVehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idTarifa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emision: {
      type: DataTypes.DATE,
      allowNull: false
    },
    vence: {
      type: DataTypes.DATE,
      allowNull: false
    },
    refrendacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tarjetas',
  });
  return Tarjetas;
};