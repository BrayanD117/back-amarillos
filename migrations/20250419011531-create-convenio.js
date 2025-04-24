module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agreements', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      kilometer: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      transportSecretaryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'TransportSecretaries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('Agreements');
  },
};