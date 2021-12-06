
module.exports = function() {

    this.sendEmail = async function (serverInfo) {

        let nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'publiccirc@gmail.com',
            pass: 'mvb93ECF#'
          }
        });
        
        let mailOptions = {
          from: 'publiccirc@gmail.com',
          to: 'publiccirc@gmail.com',
          subject: 'Server update',
          text: serverInfo
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

    };

};