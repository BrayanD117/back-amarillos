'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('People', {
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
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      secondLastName: {
        type: Sequelize.STRING(50)
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      middleName: {
        type: Sequelize.STRING(50)
      },
      documentTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TipoDocumentos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      documentNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bloodTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'GrupoSanguineos',
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
          model: 'CategoriaLicencias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      issuingAuthority: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      expiryDate: {
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
    await queryInterface.dropTable('People');
  }
};