'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DocumentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DocumentType.hasMany(models.Vehicle, { foreignKey: 'ownerDocumentTypeId' });
      DocumentType.hasMany(models.User, { foreignKey: 'documentTypeId' });
      DocumentType.hasMany(models.Company, { foreignKey: 'legalRepresentativeDocumentTypeId' });
    }
  }
  DocumentType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DocumentType',
  });
  return DocumentType;
};