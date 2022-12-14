const nodemailer = require('nodemailer')

//  create random password
function generateRandomPassword() {
    var password = "";
    for (let index = 0; index < 3; index++) {
        if (password.length <= 3) {
            password += ('a1bc2qd3ef4gk5h17ij8kl0mn8oR9prs3tyunvyzwx').split('')[(Math.floor(Math.random() * 26))];
        }
    }
    password += new Date().getMilliseconds();
    return password
}

//  send mail
function sendMail(receiver:any, newPassword:any) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sender mail address',
            pass: 'password'
        }
    });

    var mailOptions = {
        from: 'sender mail address',
        to: receiver,
        subject: 'New password created successfully',
        text: newPassword
    };

    transporter.sendMail(mailOptions, function (error:any, info:any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    });
}

module.exports = {
    sendMail,
    generateRandomPassword
}