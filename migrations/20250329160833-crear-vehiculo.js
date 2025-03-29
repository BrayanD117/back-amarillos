'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehiculos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsuario: {
        type: Sequelize.INTEGER
      },
      idTarjeta: {
        type: Sequelize.INTEGER
      },
      idEstado: {
        type: Sequelize.INTEGER
      },
      interno: {
        type: Sequelize.STRING
      },
      placa: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
      },
      linea: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.INTEGER
      },
      cilindrada: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      idServicio: {
        type: Sequelize.INTEGER
      },
      clase: {
        type: Sequelize.STRING
      },
      carroceria: {
        type: Sequelize.STRING
      },
      idCombustible: {
        type: Sequelize.INTEGER
      },
      capacidad: {
        type: Sequelize.INTEGER
      },
      motor: {
        type: Sequelize.STRING
      },
      chasis: {
        type: Sequelize.STRING
      },
      importacion: {
        type: Sequelize.STRING
      },
      fechaImportacion: {
        type: Sequelize.DATE
      },
      puertas: {
        type: Sequelize.INTEGER
      },
      fechaMatricula: {
        type: Sequelize.DATE
      },
      fechaExpedicion: {
        type: Sequelize.DATE
      },
      organismo: {
        type: Sequelize.STRING
      },
      qr: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehiculos');
  }
};