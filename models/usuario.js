'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Estado, { foreignKey: 'idEstado' });
      Usuario.belongsTo(models.Rol, { foreignKey: 'idRol' });
      Usuario.hasOne(models.Persona, { foreignKey: 'idUsuario' });
    }
  }
  Usuario.init({
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};