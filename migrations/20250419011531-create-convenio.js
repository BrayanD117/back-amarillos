module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Convenios', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
        collate: 'utf8_spanish_ci',
      },
      kilometro: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Convenios');
  },
};