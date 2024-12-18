// const express=require("express");
// const authenticate = require("../middleware/authenticat.js");
// const router=express.Router();
// const adminOrderController=require("../controllers/adminOrder.controller.js")

// router.get("/",authenticate,adminOrderController.getAllOrders);
// router.put("/:orderId/confirmed",authenticate,adminOrderController.confirmedOrder);
// router.put("/:orderId/ship",authenticate,adminOrderController.shippOrder);
// router.put("/:orderId/deliver",authenticate,adminOrderController.deliverOrder);
// router.put("/:orderId/cancel",authenticate,adminOrderController.cancelledOrder);
// router.delete("/:orderId/delete",authenticate,adminOrderController.deleteOrder);

// module.exports=router;

// const express = require("express");
// const authenticate = require("../middleware/authenticat.js");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const router = express.Router();
// const adminOrderController = require("../controllers/adminOrder.controller.js");

// router.get("/", [authenticate, auth0Authenticate], adminOrderController.getAllOrders);
// router.put("/:orderId/confirmed", [authenticate, auth0Authenticate], adminOrderController.confirmedOrder);
// router.put("/:orderId/ship", [authenticate, auth0Authenticate], adminOrderController.shippOrder);
// router.put("/:orderId/deliver", [authenticate, auth0Authenticate], adminOrderController.deliverOrder);
// router.put("/:orderId/cancel", [authenticate, auth0Authenticate], adminOrderController.cancelledOrder);
// router.delete("/:orderId/delete", [authenticate, auth0Authenticate], adminOrderController.deleteOrder);

// module.exports = router;



const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); 
const router = express.Router();
const adminOrderController = require("../controllers/adminOrder.controller.js");

router.get("/", authMiddleware, adminOrderController.getAllOrders);
router.put("/:orderId/confirmed", authMiddleware, adminOrderController.confirmedOrder);
router.put("/:orderId/ship", authMiddleware, adminOrderController.shippOrder);
router.put("/:orderId/deliver", authMiddleware, adminOrderController.deliverOrder);
router.put("/:orderId/cancel", authMiddleware, adminOrderController.cancelledOrder);
router.delete("/:orderId/delete", authMiddleware, adminOrderController.deleteOrder);

module.exports = router;
