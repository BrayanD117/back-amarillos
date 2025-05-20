'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Control extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Control.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
      Control.belongsTo(models.Driver, { foreignKey: 'driverId' });
    }
  }
  Control.init({
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    news: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accident: {
      type: DataTypes.STRING,
      allowNull: true
    },
    validation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    control: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Control',
  });
  return Control;
};