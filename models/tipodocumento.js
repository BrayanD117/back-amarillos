'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoDocumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TipoDocumento.hasMany(models.Persona, { foreignKey: 'idTipoDocumento' });
    }
  }
  TipoDocumento.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TipoDocumento',
  });
  return TipoDocumento;
};