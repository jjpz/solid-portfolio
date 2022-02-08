const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController');
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
router.post('/send', mainController.sendEmail);

router.use( ( req, res, next ) => {
    res.render('404', {title: 'Not Found'});
});

module.exports = router;
