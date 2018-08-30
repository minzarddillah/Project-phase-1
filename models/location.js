'use strict';
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      unique: { args:true, msg:`Location Sudah Ada` }
    }
  }, {
    hooks: {
      beforeCreate: (location, options)=>{
        location.name = location.name.charAt(0).toUpperCase() + location.name.slice(1);
        location.createdAt = new Date()
        location.updatedAt = new Date()
      }
    }
  });
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Hotel, { foreignKey: `address` })
  };
  return Location;
};