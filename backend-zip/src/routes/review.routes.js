// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router = express.Router();
// const reviewController = require("../controllers/review.controller.js");

// router.post("/create",authenticate,reviewController.createReview);
// router.get("/product/:productId",authenticate,reviewController.getAllReview);


// module.exports=router;

// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const router = express.Router();
// const reviewController = require("../controllers/review.controller.js");

// router.post("/create", [authenticate, auth0Authenticate], reviewController.createReview);
// router.get("/product/:productId", [authenticate, auth0Authenticate], reviewController.getAllReview);

// module.exports = router;


const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); // Dynamic authentication middleware
const router = express.Router();
const reviewController = require("../controllers/review.controller.js");

// Routes
router.post("/create", authMiddleware, reviewController.createReview);
router.get("/product/:productId", authMiddleware, reviewController.getAllReview);

module.exports = router;
