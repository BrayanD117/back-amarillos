'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agreement extends Model {
    static associate(models) {
      Agreement.belongsTo(models.TransportSecretary, { foreignKey: 'transportSecretaryId' });
    }
  }
  Agreement.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kilometer: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    transportSecretaryId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Agreement'
  });
  return Agreement;
};