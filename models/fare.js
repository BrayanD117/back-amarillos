'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fare.hasMany(models.Card, { foreignKey: 'fareId' });

      Fare.belongsTo(models.TransportSecretary, { foreignKey: 'transportSecretaryId' });
    }
  }
  Fare.init({
    transportSecretaryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minimum: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    flagDown: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    drop70m: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    drop35s: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    hour: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Fare',
  });
  return Fare;
};