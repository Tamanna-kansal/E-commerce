// const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router=express.Router();
// const orderController=require("../controllers/order.controller.js")

// router.post("/",authenticate,orderController.createOrder);
// router.get("/user",authenticate,orderController.orderHistory);
// router.get("/:id",authenticate,orderController.findOrderById);


// module.exports=router;

// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const router = express.Router();
// const orderController = require("../controllers/order.controller.js");

// router.post("/", [authenticate, auth0Authenticate], orderController.createOrder);
// router.get("/user", [authenticate, auth0Authenticate], orderController.orderHistory);
// router.get("/:id", [authenticate, auth0Authenticate], orderController.findOrderById);

// module.exports = router;

const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); 
const router = express.Router();
const orderController = require("../controllers/order.controller.js");

router.post("/", authMiddleware, orderController.createOrder);
router.get("/user", authMiddleware, orderController.orderHistory);
router.get("/:id", authMiddleware, orderController.findOrderById);

module.exports = router;
