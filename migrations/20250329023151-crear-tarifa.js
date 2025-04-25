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
      transportSecretaryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TransportSecretaries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      minimum: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      flagDown: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      drop70m: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      drop35s: {
        type: Sequelize.FLOAT,
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