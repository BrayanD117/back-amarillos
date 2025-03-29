'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      primerApellido: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      segundoApellido: {
        type: Sequelize.STRING(50)
      },
      primerNombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      segundoNombre: {
        type: Sequelize.STRING(50)
      },
      idTipoDocumento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TipoDocumentos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      numeroDocumento: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      idGrupoSanguineo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'GrupoSanguineos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      rh: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      eps: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      arl: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pension: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      licencia: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      idCategoriaLicencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CategoriaLicencias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      organismo: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      vigencia: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      foto: {
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
    await queryInterface.dropTable('Personas');
  }
};