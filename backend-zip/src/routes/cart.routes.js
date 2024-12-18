// const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router=express.Router();
// const cartController=require("../controllers/cart.controller.js")

// // GET: /api/cart
// router.get("/", authenticate, cartController.findUserCart);

// // PUT: /api/cart/add
// router.put("/add", authenticate, cartController.addItemToCart);


// module.exports=router;



// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js"); // Import Auth0 middleware
// const router = express.Router();
// const cartController = require("../controllers/cart.controller.js");

// // Use the appropriate middleware based on the authentication strategy
// router.get("/", [authenticate, auth0Authenticate], cartController.findUserCart);
// router.put("/add", [authenticate, auth0Authenticate], cartController.addItemToCart);

// module.exports = router;



const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js");

const router = express.Router();
const cartController = require("../controllers/cart.controller.js");

// Use the appropriate middleware based on the authentication strategy
router.get("/", authMiddleware, cartController.findUserCart);
router.put("/add", authMiddleware, cartController.addItemToCart);

module.exports = router;