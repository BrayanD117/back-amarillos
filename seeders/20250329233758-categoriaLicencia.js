'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'A1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'A2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'B1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'B2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'B3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'C1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'C2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('CategoriaLicencias', [{
      nombre: 'C3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
    await queryInterface.bulkDelete('CategoriaLicencias', null, {});
  }
};
