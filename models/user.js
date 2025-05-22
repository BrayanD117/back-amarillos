'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Status, { foreignKey: 'statusId' });
      User.belongsTo(models.Role, { foreignKey: 'roleId' });
      User.belongsTo(models.DocumentType, { foreignKey: 'documentTypeId' });
      User.hasOne(models.Driver, { foreignKey: 'userId' });
      User.belongsTo(models.Company, { foreignKey: 'companyId' });
      User.belongsTo(models.TransportSecretary, { foreignKey: 'transportSecretaryId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondLastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    documentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DocumentTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    transportSecretaryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TransportSecretaries',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};