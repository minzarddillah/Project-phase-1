'use strict';

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
    return queryInterface.bulkInsert(`Locations`, [{
      name: `Jakarta`,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: `Bekasi`,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: `Depok`,
      createdAt: new Date,
      updatedAt: new Date
    }, {
      name: `Bogor`,
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
