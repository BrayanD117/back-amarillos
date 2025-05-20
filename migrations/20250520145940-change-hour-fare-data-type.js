'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Fares', 'hour', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE "Fares"
      ALTER COLUMN "hour" TYPE DECIMAL USING "hour"::NUMERIC
    `);

    await queryInterface.addColumn('Users', 'documentTypeId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
      model: 'DocumentTypes',
      key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Fares', 'hour', {
      type: Sequelize.TIME,
      allowNull: false
    });

    await queryInterface.removeColumn('Users', 'documentTypeId');
  }
};