'use strict';
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      unique: {
        args: true,
        msg: `Email Already Exist`
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user,options)=>{
        const salt = user.email
        const hash = crypto.createHmac(`sha256`,salt).update(user.password).digest(`hex`)
        
        user.firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
        user.lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
        user.role = 'client'
        user.password = hash
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Hotel, { foreignKey: `userId` })
    User.hasMany(models.Room , { foreignKey: `userId` })
  };
  return User;
};