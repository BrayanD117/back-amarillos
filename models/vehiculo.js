'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehiculo.belongsTo(models.Usuario, {
        foreignKey: 'idUsuario'
      });

      Vehiculo.belongsTo(models.Estado, {
        foreignKey: 'idEstado'
      });

      Vehiculo.belongsTo(models.Servicio, {
        foreignKey: 'idServicio'
      });

      Vehiculo.belongsTo(models.Combustible, {
        foreignKey: 'idCombustible'
      });

      Vehiculo.belongsTo(models.Tarjetas, {
        foreignKey: 'idTarjeta'
      });
    }
  }
  Vehiculo.init({
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idTarjeta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    interno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    linea: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cilindrada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idServicio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    importacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaImportacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    puertas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaMatricula: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaExpedicion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    orgnismo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qr: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Vehiculo',
  });
  return Vehiculo;
};