const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const sendgridTransport = require('nodemailer-sendgrid-transport');
// const multiparty = require('multiparty');
const path = require('path');
const env = require('dotenv');
const envFilePath = path.resolve(__dirname, './.env');
env.config({ path: envFilePath });

router.get('/', mainController.viewHome);
router.get('/hosting', mainController.viewHostingPage);
router.get('/custom-websites', mainController.viewCustomWebsitesPage);
router.get('/solid-pro-services', mainController.viewSpsPage);
router.get('/terms-of-service', mainController.viewTermsPage);
router.get('/privacy-policy', mainController.viewPrivacyPage);
router.get('/contact', mainController.viewContactPage);

router.post('/create-checkout-session', mainController.createCheckoutSession);
router.get('/hosting/order/success*', mainController.viewOrderSuccessPage);

// Send email to Solid via Gmail
router.post('/send', (req, res) => {
    console.log(req.body);
    const data = req.body;

    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: accessToken
        },
    });

    // verify connection configuration
    transporter.verify((error, success) => {
        error
            ? console.log(`VERIFY ERROR: ${error}`)
            : console.log(`VERIFY SUCCESS: ${success}`);
    });

    let mailOptions = {
        priority: 'high',
        from: `${data.firstname} ${data.lastname} <${process.env.EMAIL_USERNAME}>`,
        to: `${process.env.EMAIL_USERNAME}`,
        cc: ['christian@solidmiami.com', 'juanjo@solidmiami.com'],
        subject: 'Solid Website Contact Form Email',
        html: `<p>First Name: ${data.firstname}</p>
            <p>Last Name: ${data.lastname}</p>
            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phone}</p>
            <p>Message: ${data.message}</p>`
    };
    // console.log(mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`SEND ERROR: ${error}`);
            res.status(500).send('Something went wrong...');
        } else {
            console.log('SEND SUCCESS');
            console.log(`${info.messageId}`);
            console.log(`${info.envelope}`);
            console.log(`${info.accepted}`);
            console.log(`${info.rejected}`);
            console.log(`${info.pending}`);
            console.log(`${info.response}`);
            res.status(200).send(JSON.stringify('Email successfully sent!'));
        }
    });

});

router.use( ( req, res, next ) => {
    res.render('404');
});

module.exports = router;
