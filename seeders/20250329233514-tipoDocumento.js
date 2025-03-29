'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TipoDocumentos', [{
      nombre: 'Cédula de Ciudadanía',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('TipoDocumentos', [{
      nombre: 'Cédula de Extranjería',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('TipoDocumentos', [{
      nombre: 'Pasaporte',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TipoDocumentos', null, {});
    await queryInterface.bulkDelete('TipoDocumentos', null, {});
    await queryInterface.bulkDelete('TipoDocumentos', null, {});
  }
};