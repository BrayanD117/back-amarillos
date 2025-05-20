'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drivers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bloodTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BloodTypes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      rhFactor: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      healthInsurance: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      workInsurance: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pension: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      licenseNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      licenseCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'LicenseCategories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      photo: {
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
    await queryInterface.dropTable('Drivers');
  }
};