'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Requirement.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    }
  }
  Requirement.init({
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    soat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soatCompany: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soatIssue: {
      type: DataTypes.DATE,
      allowNull: false
    },
    soatDue: {
      type: DataTypes.DATE,
      allowNull: false
    },
    vehicleInspection: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicleInspectionCompany: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vehicleInspectionIssue: {
      type: DataTypes.DATE,
      allowNull: false
    },
    vehicleInspectionDue: {
      type: DataTypes.DATE,
      allowNull: false
    },
    thirdParty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thirdPartyCompany: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thirdPartyIssue: {
      type: DataTypes.DATE,
      allowNull: false
    },
    thirdPartyDue: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Requirement',
  });
  return Requirement;
};