process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require('dotenv').config()
const nodemailer = require('nodemailer');

let mail = async(email, username) => {
    // 1. Create a transport - Object that connects to your email and send emails on behalf of you.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAILUSER,
            pass:  process.env.GMAILPASS
        }
    })

    // 2. Compose a message
    let message = {
        from: process.env.GMAILUSER,
        to: email,
        subject: "Registration successful 🎉",
        html:`Hello..! ${username} you have successfully registered... `, // HTML body
    }

    // 3. Send the mail
    await transporter.sendMail(message);
    console.log("Email sent ✔️...");
}

//mail();
module.exports = mail;