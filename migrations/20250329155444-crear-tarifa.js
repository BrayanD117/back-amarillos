'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarifas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      minima: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      banderazo: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      caida70m: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      caida35s: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
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
    await queryInterface.dropTable('Tarifas');
  }
};