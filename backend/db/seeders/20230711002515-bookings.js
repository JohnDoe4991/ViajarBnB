'use strict';
const { Booking } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2076-12-25",
        endDate: "2076-12-26"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-07-14",
        endDate: "2023-11-19"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "1984-11-19",
        endDate: "2023-11-19"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2022-11-30"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2023-09-07",
        endDate: "2023-09-11"
      },
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings"
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};

