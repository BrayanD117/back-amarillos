'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      { code: '05', name: 'Antioquia', createdAt: new Date(), updatedAt: new Date() },
      { code: '08', name: 'Atlántico', createdAt: new Date(), updatedAt: new Date() },
      { code: '11', name: 'Bogotá D.C.', createdAt: new Date(), updatedAt: new Date() },
      { code: '13', name: 'Bolívar', createdAt: new Date(), updatedAt: new Date() },
      { code: '15', name: 'Boyacá', createdAt: new Date(), updatedAt: new Date() },
      { code: '17', name: 'Caldas', createdAt: new Date(), updatedAt: new Date() },
      { code: '18', name: 'Caquetá', createdAt: new Date(), updatedAt: new Date() },
      { code: '19', name: 'Cauca', createdAt: new Date(), updatedAt: new Date() },
      { code: '20', name: 'Cesar', createdAt: new Date(), updatedAt: new Date() },
      { code: '23', name: 'Córdoba', createdAt: new Date(), updatedAt: new Date() },
      { code: '25', name: 'Cundinamarca', createdAt: new Date(), updatedAt: new Date() },
      { code: '27', name: 'Chocó', createdAt: new Date(), updatedAt: new Date() },
      { code: '41', name: 'Huila', createdAt: new Date(), updatedAt: new Date() },
      { code: '44', name: 'La Guajira', createdAt: new Date(), updatedAt: new Date() },
      { code: '47', name: 'Magdalena', createdAt: new Date(), updatedAt: new Date() },
      { code: '50', name: 'Meta', createdAt: new Date(), updatedAt: new Date() },
      { code: '52', name: 'Nariño', createdAt: new Date(), updatedAt: new Date() },
      { code: '54', name: 'Norte de Santander', createdAt: new Date(), updatedAt: new Date() },
      { code: '63', name: 'Quindío', createdAt: new Date(), updatedAt: new Date() },
      { code: '66', name: 'Risaralda', createdAt: new Date(), updatedAt: new Date() },
      { code: '68', name: 'Santander', createdAt: new Date(), updatedAt: new Date() },
      { code: '70', name: 'Sucre', createdAt: new Date(), updatedAt: new Date() },
      { code: '73', name: 'Tolima', createdAt: new Date(), updatedAt: new Date() },
      { code: '76', name: 'Valle del Cauca', createdAt: new Date(), updatedAt: new Date() },
      { code: '81', name: 'Arauca', createdAt: new Date(), updatedAt: new Date() },
      { code: '85', name: 'Casanare', createdAt: new Date(), updatedAt: new Date() },
      { code: '86', name: 'Putumayo', createdAt: new Date(), updatedAt: new Date() },
      { code: '88', name: 'San Andrés y Providencia', createdAt: new Date(), updatedAt: new Date() },
      { code: '91', name: 'Amazonas', createdAt: new Date(), updatedAt: new Date() },
      { code: '94', name: 'Guainía', createdAt: new Date(), updatedAt: new Date() },
      { code: '95', name: 'Guaviare', createdAt: new Date(), updatedAt: new Date() },
      { code: '97', name: 'Vaupés', createdAt: new Date(), updatedAt: new Date() },
      { code: '99', name: 'Vichada', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
