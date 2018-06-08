const express = require('express');
const process = require('process');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const app = express();

const port = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());

// Force HTTPS
app.use(function(req, res, next) {
    if (process.env.HEROKU_APP_NAME && ! (req.secure || req.headers['x-forwarded-proto'] === 'https')) {
        var secureUrl = "https://" + req.headers['host'] + req.url;
        res.writeHead(301, { "Location":  secureUrl });
        res.end();
    }
    next();
});

app.post('/api/contact', (req, res) => {
    console.log('Incoming contact request', req.body);

    const msg = {
        to: 'info@kumolo.io',
        from: req.body.email,
        subject: 'A message from kumolo.io (' + process.env.HEROKU_APP_NAME + ')',
        text: req.body.message
    };

    sgMail.send(msg, (err, _) => {
        if (err) {
            console.error("Error sending mail with SendGrid", err);
            res.status(500);
            res.end();

            return;
        }

        res.status(201);
        res.end();
    });
});
app.use(express.static('public'));

app.listen(port, () => console.log(`App listening on ${port}`));