'use strict';
const crypto = require('crypto');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const salt = `admin@kost.com`
    const hash = crypto.createHmac(`sha256`,salt).update(`123`).digest(`hex`)
    return queryInterface.bulkInsert('Users', [{
      firstName: 'admin',
      lastName: null,
      gender: null,
      email: `admin@kost.com`,
      password: hash,
      role: `admin`
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete(`Users`, null, {});
  }
};
