'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requirements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      soat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      soatCompany: {
        type: Sequelize.STRING,
        allowNull: false
      },
      soatIssue: {
        type: Sequelize.DATE,
        allowNull: false
      },
      soatDue: {
        type: Sequelize.DATE,
        allowNull: false
      },
      vehicleInspection: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vehicleInspectionCompany: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vehicleInspectionIssue: {
        type: Sequelize.DATE,
        allowNull: false
      },
      vehicleInspectionDue: {
        type: Sequelize.DATE,
        allowNull: false
      },
      thirdParty: {
        type: Sequelize.STRING,
        allowNull: false
      },
      thirdPartyCompany: {
        type: Sequelize.STRING,
        allowNull: false
      },
      thirdPartyIssue: {
        type: Sequelize.DATE,
        allowNull: false
      },
      thirdPartyDue: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Requirements');
  }
};