'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      cardId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cards',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      internalNumber: {
        type: Sequelize.STRING
      },
      licensePlate: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      line: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.INTEGER
      },
      displacement: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      serviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Services',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      vehicleClass: {
        type: Sequelize.STRING
      },
      bodyType: {
        type: Sequelize.STRING
      },
      fuelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Fuels',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      engine: {
        type: Sequelize.STRING
      },
      chassis: {
        type: Sequelize.STRING
      },
      importation: {
        type: Sequelize.STRING
      },
      importDate: {
        type: Sequelize.DATE
      },
      doors: {
        type: Sequelize.INTEGER
      },
      registrationDate: {
        type: Sequelize.DATE
      },
      issueDate: {
        type: Sequelize.DATE
      },
      issuingAuthority: {
        type: Sequelize.STRING
      },
      qrCode: {
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
    await queryInterface.dropTable('Vehicles');
  }
};