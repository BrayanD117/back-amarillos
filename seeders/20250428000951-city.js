"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cities", [
      {
        departmentId: 13,
        code: "41001",
        name: "Neiva",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        departmentId: 23,
        code: "73001",
        name: "Ibagué",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
