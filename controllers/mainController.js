const path = require('path');
const env = require('dotenv');
const envFilePath = path.resolve(__dirname, '../.env');
env.config({ path: envFilePath });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

exports.viewHome = function (req, res) {
    res.render('index');
};

exports.viewHostingPage = function (req, res) {
    res.render('hosting');
};

exports.viewCustomWebsitesPage = function (req, res) {
    res.render('websites');
};

exports.viewSpsPage = function (req, res) {
    res.render('solid-pro-services');
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
        success_url: `${domainURL}/?session_id={CHECKOUT_SESSION_ID}`,
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
}