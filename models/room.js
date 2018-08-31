'use strict';
module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define('Room', {
    kostId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rentStatus: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    dueDate: DataTypes.DATE,
    photo: DataTypes.STRING
  }, {});
  Room.associate = function(models) {
    Room.belongsTo(models.Hotel, { foreignKey: 'kostId' })
    Room.belongsTo(models.User, { foreignKey: 'userId' })
    // associations can be defined here
  };
  return Room;
};