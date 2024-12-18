// const express=require("express");
// const router=express.Router();
// const productController=require("../controllers/product.controller.js");


// router.post('/', productController.createProduct);
// router.post('/creates', productController.createMultipleProduct);
// router.delete('/:id', productController.deleteProduct);
// router.put('/:id', productController.updateProduct);

// module.exports=router;

// const express = require("express");
// const auth0Authenticate = require("../middleware/auth0Authenticate.js");
// const authenticate = require("../middleware/authenticat.js");
// const router = express.Router();
// const productController = require("../controllers/product.controller.js");

// router.post("/", [authenticate, auth0Authenticate], productController.createProduct);
// router.post("/creates", [authenticate, auth0Authenticate], productController.createMultipleProduct);
// router.delete("/:id", [authenticate, auth0Authenticate], productController.deleteProduct);
// router.put("/:id", [authenticate, auth0Authenticate], productController.updateProduct);

// module.exports = router;


const express = require("express");
const authMiddleware = require("../middleware/Midchoice.js"); 
const router = express.Router();
const productController = require("../controllers/product.controller.js");

router.post("/", authMiddleware, productController.createProduct);
router.post("/creates", authMiddleware, productController.createMultipleProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.put("/:id", authMiddleware, productController.updateProduct);

module.exports = router;

