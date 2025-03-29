'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarifa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarifa.hasMany(models.Tarjeta, { foreignKey: 'idTarifa' });
    }
  }
  Tarifa.init({
    minima: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    banderazo: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    caida70m: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    caida35s: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tarifa',
  });
  return Tarifa;
};