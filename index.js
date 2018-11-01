const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 1888;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER_NAME,
    pass: process.env.MAIL_USER_PASSWORD
  }
});


app.get('/', (req, res) => {
  res.send('Hello from mailer!')
});

app.get('/send', (req, res) => {

  const {
    from, to, subject, text, delay = 3000
  } = req.query;

  const mailOptions = {from, to, subject, text};

  setTimeout(() => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
  }, delay);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

