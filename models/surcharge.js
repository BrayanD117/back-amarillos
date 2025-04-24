'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surcharge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Surcharge.init({
    transportSecretaryId: DataTypes.INTEGER,
    airport: DataTypes.FLOAT,
    terminal: DataTypes.FLOAT,
    law: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Surcharge',
  });
  return Surcharge;
};