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
      companyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      personId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'People',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      internalNumber: {
        type: Sequelize.STRING,
        allowNull: false        
      },
      licensePlate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      line: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cylinderCapacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false
      },
      serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      vehicleClass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bodyType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fuelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Fuels',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      capacity: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      engine: {
        type: Sequelize.STRING,
        allowNull: false
      },
      chassis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      importation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      importDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      doors: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      issueDate: {
        type: Sequelize.DATE,
        allowNull: false
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
      qrCode: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Vehicles');
  }
};