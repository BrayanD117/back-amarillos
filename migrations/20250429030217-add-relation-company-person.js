'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Companies', {
      fields: ['legalRepresentativeId'],
      type: 'foreign key',
      name: 'fk_companies_legalRepresentativeId',
      references: {
        table: 'People',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Companies', 'fk_companies_legalRepresentativeId');
  }
};