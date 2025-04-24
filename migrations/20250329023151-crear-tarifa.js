'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      minimum: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      flagDown: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      drop70m: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      drop35s: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      hour: {
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
    await queryInterface.dropTable('Fares');
  }
};