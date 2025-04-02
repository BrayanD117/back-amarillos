'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Vehiculos', 'idTarjeta');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Vehiculos', 'idTarjeta', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
