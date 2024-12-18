// const express=require("express");

// const router=express.Router();
// const userController=require("../controllers/user.controller.js")

// router.get("/",userController.getAllUsers)
// router.get("/profile",userController.getUserProfile)

// module.exports=router;

// const express = require("express");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const authenticate = require("../middleware/authenticat.js"); // Custom middleware
// const router = express.Router();
// const userController = require("../controllers/user.controller.js");

// // Routes
// router.get("/", [authenticate, auth0Authenticate], userController.getAllUsers);
// router.get("/profile", [authenticate, auth0Authenticate], userController.getUserProfile);

// module.exports = router;


const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); // Dynamic authentication middleware
const router = express.Router();
const userController = require("../controllers/user.controller.js");

// Routes
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/profile", authMiddleware, userController.getUserProfile);

module.exports = router;
