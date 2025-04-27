'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DocumentTypes', [{
      name: 'Cédula de Ciudadanía',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('DocumentTypes', [{
      name: 'Cédula de Extranjería',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('DocumentTypes', [{
      name: 'Pasaporte',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DocumentTypes', null, {});
    await queryInterface.bulkDelete('DocumentTypes', null, {});
    await queryInterface.bulkDelete('DocumentTypes', null, {});
  }
};