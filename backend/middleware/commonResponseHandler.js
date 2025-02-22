const nodemailer = require('nodemailer');

exports. transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services
  auth: {
    user: 'skkumar97260',   //googleAccount=>security=>app password(search)
    pass: 'umkh ekrq fwfh vpic',
  }
});


