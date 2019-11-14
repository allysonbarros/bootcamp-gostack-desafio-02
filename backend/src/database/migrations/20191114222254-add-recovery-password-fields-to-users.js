module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('users', 'recovery_token', {
        type: Sequelize.STRING,
        allowNull: true,
      }),

      queryInterface.addColumn('users', 'recovery_token_expiration_at', {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('users', 'recovery_token'),
      queryInterface.removeColumn('users', 'recovery_token_expiration_at'),
    ]);
  },
};
