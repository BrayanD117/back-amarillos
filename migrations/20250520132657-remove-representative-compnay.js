'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Companies', 'legalRepresentativeId');

    await queryInterface.addColumn('Companies', 'legalRepresentativeName', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('Companies', 'legalRepresentativeDocument', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Companies', 'legalRepresentativeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.removeColumn('Companies', 'legalRepresentativeName');
    await queryInterface.removeColumn('Companies', 'legalRepresentativeDocument');
  }
};
