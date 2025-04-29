'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.Vehicle, {
        foreignKey: 'vehicleId'
      });

      Card.belongsTo(models.Person, {
        foreignKey: 'personId'
      });
      
      Card.belongsTo(models.Fare, {
        foreignKey: 'fareId'
      });

      Card.belongsTo(models.User, {
        foreignKey: 'personId'
      });
    }
  }
  Card.init({
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fareId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endorsement: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Card'
  });
  return Card;
};