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

      Card.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      
      Card.belongsTo(models.Fare, {
        foreignKey: 'fareId'
      });
    }
  }
  Card.init({
    vehicleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    fareId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    issueDate: DataTypes.DATE,
    expiryDate: DataTypes.DATE,
    endorsement: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Card',
    tableName: 'Cards',
  });
  return Card;
};