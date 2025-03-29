'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriaLicencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoriaLicencia.hasMany(models.Persona, { foreignKey: 'idCategoriaLicencia' });
    }
  }
  CategoriaLicencia.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CategoriaLicencia',
  });
  return CategoriaLicencia;
};