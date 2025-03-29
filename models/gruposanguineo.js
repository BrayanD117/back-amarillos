'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GrupoSanguineo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GrupoSanguineo.hasMany(models.Persona, { foreignKey: 'idGrupoSanguineo' });
    }
  }
  GrupoSanguineo.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'GrupoSanguineo',
  });
  return GrupoSanguineo;
};