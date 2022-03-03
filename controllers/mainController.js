const path = require('path');
const env = require('dotenv');
const envFilePath = path.resolve(__dirname, '../.env');
env.config({ path: envFilePath });

const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const sendgridTransport = require('nodemailer-sendgrid-transport');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

exports.viewHome = (req, res) => {
    res.render('index', {title: 'Home'});
};

exports.viewSpsPage = (req, res) => {
    res.render('solid-pro-services', {title: 'Solid Pro Services'});
};

exports.viewCustomWebsitesPage = (req, res) => {
    res.render('websites', {title: 'Custom Websites'});
};

exports.viewHostingPage = (req, res) => {
    res.render('hosting', {title: 'Web Hosting'});
};

exports.viewTermsPage = (req, res) => {
    res.render('terms-of-service', {title: 'Terms of Services'});
};

exports.viewPrivacyPage = (req, res) => {
    res.render('privacy-policy', {title: 'Privacy Policy'});
};

exports.viewContactPage = (req, res) => {
    res.render('contact', {title: 'Contact Us'});
};

exports.sendEmail = (req, res) => {
    const data = req.body;
    console.log(data);

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
        to: process.env.EMAIL_USERNAME,
        cc: [process.env.EMAIL_CJ, process.env.EMAIL_JJ],
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
            res.status(500).send({message: 'Something went wrong.'});
        } else {
            console.log('SEND SUCCESS');
            // console.log(`${info.messageId}`);
            // console.log(`${info.envelope}`);
            // console.log(`${info.accepted}`);
            // console.log(`${info.rejected}`);
            // console.log(`${info.pending}`);
            // console.log(`${info.response}`);
            res.status(200).send({message: 'Email successfully sent!'});
        }
    });

};

exports.createCheckoutSession = async function (req, res) {
    const domainURL = process.env.DOMAIN;
    const prices = req.body.priceId;
    const items = [];
    if (Array.isArray(prices)) {
        prices.forEach(price => {
            let item = {
                price: price,
                quantity: 1
            };
            items.push(item);
        });
    } else {
        let item = {
            price: prices,
            quantity: 1
        };
        items.push(item);
    }
    // console.log(items);

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    try {
        const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: items,
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: `${domainURL}/hosting/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainURL}/hosting`,
        });

        return res.redirect(303, session.url);
    } catch (e) {
        res.status(400);
        return res.send({
            error: {
                message: e.message,
            }
        });
    }
};

exports.viewOrderSuccessPage = async function (req, res) {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        return res.render('hosting-success');
    } catch (e) {
        return res.render('404');
    }
};