'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
        },
        onDelete: 'CASCADE',
        hooks: true
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'CASCADE',
        hooks: true
      },
      review: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews"
    await queryInterface.dropTable(options);
  }
};
