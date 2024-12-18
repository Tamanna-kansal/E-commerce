// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router = express.Router();
// const ratingController = require("../services/rating.service.js");

// router.get("/create",authenticate,ratingController.createRating);
// router.put("/product/:productId",authenticate,ratingController.getProductsRating);


// module.exports=router;


// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const router = express.Router();
// const ratingController = require("../services/rating.service.js");

// router.get("/create", [authenticate, auth0Authenticate], ratingController.createRating);
// router.put("/product/:productId", [authenticate, auth0Authenticate], ratingController.getProductsRating);

// module.exports = router;

const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); 
const router = express.Router();
const ratingController = require("../services/rating.service.js");

router.get("/create", authMiddleware, ratingController.createRating);
router.put("/product/:productId",authMiddleware , ratingController.getProductsRating);

module.exports = router;