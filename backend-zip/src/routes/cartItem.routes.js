// const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router=express.Router();

// const cartItemController=require("../controllers/cartItem.controller.js");

// router.put("/:id",authenticate,cartItemController.updateCartItem);
// router.delete("/:id",authenticate,cartItemController.removeCartItem);

// module.exports=router;


// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const router = express.Router();
// const cartItemController = require("../controllers/cartItem.controller.js");

// router.put("/:id", [authenticate, auth0Authenticate], cartItemController.updateCartItem);
// router.delete("/:id", [authenticate, auth0Authenticate], cartItemController.removeCartItem);

// module.exports = router;



const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js");
const router = express.Router();
const cartItemController = require("../controllers/cartItem.controller.js");

router.put("/:id", authMiddleware, cartItemController.updateCartItem);
router.delete("/:id", authMiddleware, cartItemController.removeCartItem);

module.exports = router;