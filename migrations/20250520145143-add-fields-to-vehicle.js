'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Vehicles', 'ownerFullName', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Vehicles', 'ownerDocumentTypeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'DocumentTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('Vehicles', 'ownerDocumentNumber', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Vehicles', 'ownerPhone', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Vehicles', 'ownerAddress', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Vehicles', 'ownerFullName');
    await queryInterface.removeColumn('Vehicles', 'ownerDocumentTypeId');
    await queryInterface.removeColumn('Vehicles', 'ownerDocumentNumber');
    await queryInterface.removeColumn('Vehicles', 'ownerPhone');
    await queryInterface.removeColumn('Vehicles', 'ownerAddress');
  }
};