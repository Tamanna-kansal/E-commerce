// const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router=express.Router();
// const paymentController=require("../controllers/payment.controller.js");

// router.post("/:id",authenticate,paymentController.createPaymentLink);
// router.get("/",authenticate,paymentController.updatePaymentInformation);


// module.exports=router;


// // routes/payment.routes.js
// const express = require('express');
// const router = express.Router();
// const { createPaymentLink, updatePaymentInformation } = require('../controllers/payment.controller.js');

// router.post('/:id', createPaymentLink);
// router.get('/', updatePaymentInformation);

// module.exports = router;


// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const router = express.Router();
// const { createPaymentLink, updatePaymentInformation } = require("../controllers/payment.controller.js");

// router.post("/:id", [authenticate, auth0Authenticate], createPaymentLink);
// router.get("/", [authenticate, auth0Authenticate], updatePaymentInformation);

// module.exports = router;



const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); 
const router = express.Router();
const { createPaymentLink, updatePaymentInformation } = require("../controllers/payment.controller.js");

router.post("/:id", authMiddleware, createPaymentLink);
router.get("/", authMiddleware, updatePaymentInformation);

module.exports = router;
