// const express=require("express");
// const router=express.Router();
// const productController=require("../controllers/product.controller.js");

// router.get('/', productController.getAllProducts);
// router.get('/id/:id', productController.findProductById);
// router.get('/search', productController.searchProduct);


// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/product.controller.js");
// const authenticate = require("../middleware/authenticat"); // Custom JWT middleware
// const auth0Authenticate = require("../middleware/auth0Authenticate"); // Updated Auth0 middleware

// // GET: /api/products
// // Use Custom JWT or Auth0 authentication middleware
// router.get("/", [auth0Authenticate, authenticate], productController.getAllProducts);

// // GET: /api/products/id/:id
// // Use Custom JWT or Auth0 authentication middleware
// router.get("/id/:id", [auth0Authenticate, authenticate], productController.findProductById);

// // GET: /api/products/search
// // Use Custom JWT or Auth0 authentication middleware
// router.get("/search", [auth0Authenticate, authenticate], productController.searchProduct);

// module.exports = router;




const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/Midchoice.js"); 
const productController = require("../controllers/product.controller.js");


// GET: /api/products
// Use Custom JWT or Auth0 authentication middleware
router.get("/", authMiddleware, productController.getAllProducts);

// GET: /api/products/id/:id
// Use Custom JWT or Auth0 authentication middleware
router.get("/id/:id", authMiddleware, productController.findProductById);

// GET: /api/products/search
// Use Custom JWT or Auth0 authentication middleware
router.get("/search", authMiddleware, productController.searchProduct);

module.exports = router;
