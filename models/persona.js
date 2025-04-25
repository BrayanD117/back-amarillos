'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Person.belongsTo(models.User, { foreignKey: 'userId' }); 
      Person.belongsTo(models.DocumentType, { foreignKey: 'documentTypeId' });
      Person.belongsTo(models.BloodType, { foreignKey: 'bloodTypeId' });
      Person.belongsTo(models.LicenseCategory, { foreignKey: 'licenseCategoryId' }); 

      Person.hasMany(models.Control, { foreignKey: 'personId' });
      Person.hasMany(models.Company, { foreignKey: "legalRepresentativeId" });
    }
  }
  Person.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondLastName: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: DataTypes.STRING,
    documentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bloodTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rhFactor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthInsurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workInsurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licenseCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issuingAuthority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};