'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Vehicles', 'cardId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Vehicles', 'cardId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
