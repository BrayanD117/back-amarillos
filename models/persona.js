'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Persona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Persona.belongsTo(models.TipoDocumento, { foreignKey: 'idTipoDocumento' });
      Persona.belongsTo(models.GrupoSanguineo, { foreignKey: 'idGrupoSanguineo' });
      Persona.belongsTo(models.CategoriaLicencia, { foreignKey: 'idCategoriaLicencia' }); 
    }
  }
  Persona.init({
    primerApellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segundoApellido: DataTypes.STRING,
    primerNombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    segundoNombre: DataTypes.STRING,
    idTipoDocumento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numeroDocumento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idGrupoSanguineo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rh: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eps: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    licencia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idCategoriaLicencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    organismo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vigencia: {
      type: DataTypes.DATE,
      allowNull: false
    },
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Persona',
  });
  return Persona;
};