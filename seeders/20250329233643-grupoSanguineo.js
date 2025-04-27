'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('BloodTypes', [{
      name: 'A',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('BloodTypes', [{
      name: 'B',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('BloodTypes', [{
      name: 'AB',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('BloodTypes', [{
      name: 'O',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BloodTypes', null, {});
    await queryInterface.bulkDelete('BloodTypes', null, {});
    await queryInterface.bulkDelete('BloodTypes', null, {});
    await queryInterface.bulkDelete('BloodTypes', null, {});
  }
};
