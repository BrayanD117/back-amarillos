'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('TransportSecretaries', [
      {
        name: 'Secretiaría de Transporte de Neiva',
        cityId: 1,
        address: 'Calle 24 #62-49 Complejo Empresarial Gran Estación II',
        phoneNumber: '6013873434',
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Secretaría de Movilidad de Ibagué',
        cityId: 2,
        address: 'Calle 13 #37-35',
        phoneNumber: '6013649400',
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TransportSecretaries', null, {});
  }
};
