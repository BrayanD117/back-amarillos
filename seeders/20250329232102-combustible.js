'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Combustibles', [{
      nombre: 'Gasolina',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Combustibles', [{
      nombre: 'Diesel',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Combustibles', null, {});
    await queryInterface.bulkDelete('Combustibles', null, {});
  }
};
