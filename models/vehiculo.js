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
    }
  }
  Vehiculo.init({
    idUsuario: {
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
    clase: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carroceria: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    motor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    chasis: {
      type: DataTypes.STRING,
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
    organismo: {
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