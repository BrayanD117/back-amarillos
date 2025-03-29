'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GrupoSanguineos', [{
      nombre: 'A',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('GrupoSanguineos', [{
      nombre: 'B',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('GrupoSanguineos', [{
      nombre: 'AB',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('GrupoSanguineos', [{
      nombre: 'O',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GrupoSanguineos', null, {});
    await queryInterface.bulkDelete('GrupoSanguineos', null, {});
    await queryInterface.bulkDelete('GrupoSanguineos', null, {});
    await queryInterface.bulkDelete('GrupoSanguineos', null, {});
  }
};
