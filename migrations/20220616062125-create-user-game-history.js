'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGameHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playingDuration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      levelUser: {
        type: Sequelize.ENUM,
        values: [
          'beginner',
          'intermediate',
          'expert',
          'professional'
        ],
        defaultValue: 'beginner',
        allowNull: false,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserGameHistories');
  }
};