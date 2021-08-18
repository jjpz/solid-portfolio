const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController');

router.get('/', mainController.viewHome);
router.get('/hosting', mainController.viewHostingPage);
router.get('/custom-websites', mainController.viewCustomWebsitesPage);
router.get('/solid-pro-services', mainController.viewSpsPage);

router.post('/create-checkout-session', mainController.createCheckoutSession);
router.get('/hosting/order/success*', mainController.viewOrderSuccessPage);

router.use( ( req, res, next ) => {
    res.render('404');
});

module.exports = router;
