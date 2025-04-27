'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'A1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'A2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'B1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'B2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'B3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'C1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'C2',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('LicenseCategories', [{
      name: 'C3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
    await queryInterface.bulkDelete('LicenseCategories', null, {});
  }
};
