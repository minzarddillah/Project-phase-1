'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hotel = sequelize.define('Hotel', {
    name: DataTypes.STRING,
    address: DataTypes.INTEGER,
    typeKost: DataTypes.STRING,
    foto: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (kost,options)=>{
        kost.name = kost.name.charAt(0).toUpperCase() + kost.name.slice(1);
        kost.typeKost = kost.typeKost.charAt(0).toUpperCase() + kost.typeKost.slice(1);
      }
    }
  });
  Hotel.associate = function(models) {
    Hotel.hasMany(models.Room, { foreignKey: `kostId` })
    Hotel.belongsTo(models.User, { foreignKey: `userId`})
    Hotel.belongsTo(models.Location, { foreignKey: 'address' })
  };
  return Hotel;
};