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
      Surcharge.belongsTo(models.TransportSecretary, { foreignKey: 'transportSecretaryId' });
    }
  }
  Surcharge.init({
    transportSecretaryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    airport: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    terminal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    law: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Surcharge',
  });
  return Surcharge;
};