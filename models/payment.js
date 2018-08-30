'use strict';
var nodemailer = require('nodemailer');
module.exports = (sequelize, DataTypes) => {
  var Payment = sequelize.define('Payment', {
    namaKost: DataTypes.STRING,
    tipeKost: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    checkIn: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    userEmail: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function (payment, options) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'demo.project.hacktiv@gmail.com',
            pass: 'm3st1ny4k4ut4hu'
          }
        });
        const mailOptions = {
          from: 'demo.project.hacktiv@gmail.com', // sender address
          to: payment.userEmail, // list of receivers
          subject: 'Payment Berhasil', // Subject line
          html: `<p>Payment anda berhasil, terima kasih telah menggunakan jasa kami</p><br>
          <form>
            Nama Kost : ${payment.namaKost} <br>
            Tipe Kost : ${payment.tipeKost} <br>
            Tanggal : ${payment.checkIn} (yyyy-mm-dd)<br>
            Harga : ${payment.price} <br>
          </form>`
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
       });
      }
    }
  });
  Payment.associate = function (models) {
    // associations can be defined here
  };
  return Payment;
};