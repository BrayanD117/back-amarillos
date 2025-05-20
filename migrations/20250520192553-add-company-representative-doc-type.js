'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Companies', 'legalRepresentativeDocumentTypeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'DocumentTypes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Companies', 'legalRepresentativeDocumentTypeId');
  }
};