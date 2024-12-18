const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");
const User = require("../models/user.model.js");


// Create a new cart for a user
async function createCart(user) {
  const cart = new Cart({ user });
  const createdCart = await cart.save();
  return createdCart;
}

// Find a user's cart and update cart details
async function findUserCart(userId) {
  let cart =await Cart.findOne({ user: userId })
  
  let cartItems=await CartItem.find({cart:cart._id}).populate("product")

  cart.cartItems=cartItems
  

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (const cartItem of cart.cartItems) {
    totalPrice += cartItem.price;
    totalDiscountedPrice += cartItem.discountedPrice;
    totalItem += cartItem.quantity;
  }

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.discounte = totalPrice - totalDiscountedPrice;

  // const updatedCart = await cart.save();
  return cart;
}

// Add an item to the user's cart
async function addCartItem(userId, req) {
 
  const cart = await Cart.findOne({ user: userId });
  const product = await Product.findById(req.productId);

  const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId });
  

  if (!isPresent) {
    const cartItem = new CartItem({
      product: product._id,
      cart: cart._id,
      quantity: 1,
      userId,
      price: product.discountedPrice,
      size: req.size,
      discountedPrice:product.discountedPrice
    });

   

    const createdCartItem = await cartItem.save();
    cart.cartItems.push(createdCartItem);
    await cart.save();
  }

  return 'Item added to cart';
}

module.exports = { createCart, findUserCart, addCartItem };


// const Cart = require("../models/cart.model.js");
// const CartItem = require("../models/cartItem.model.js");
// const Product = require("../models/product.model.js");
// const User = require("../models/user.model.js");

// // Create a new cart for a user
// async function createCart(userId) {
//     // Ensure the user exists
//     const user = await User.findOne({ auth0Id: userId });
//     if (!user) {
//         throw new Error(`User not found with id: ${userId}`);
//     }

//     // Create a new cart
//     const cart = new Cart({ user: user._id });
//     const createdCart = await cart.save();
//     return createdCart;
// }

// // Find a user's cart and include cart details
// async function findUserCart(userId) {
//     // Fetch the user using Auth0 ID
//     const user = await User.findOne({ auth0Id: userId });
//     if (!user) {
//         throw new Error(`User not found with id: ${userId}`);
//     }

//     // Find the cart associated with the user
//     const cart = await Cart.findOne({ user: user._id });
//     if (!cart) {
//         throw new Error(`Cart not found for user with id: ${user._id}`);
//     }

//     // Populate cart items with product details
//     const cartItems = await CartItem.find({ cart: cart._id }).populate("product");

//     // Calculate cart totals
//     let totalPrice = 0;
//     let totalDiscountedPrice = 0;
//     let totalItem = 0;

//     for (const cartItem of cartItems) {
//         totalPrice += cartItem.price;
//         totalDiscountedPrice += cartItem.discountedPrice;
//         totalItem += cartItem.quantity;
//     }

//     cart.cartItems = cartItems;
//     cart.totalPrice = totalPrice;
//     cart.totalItem = totalItem;
//     cart.totalDiscountedPrice = totalDiscountedPrice;
//     cart.discount = totalPrice - totalDiscountedPrice;

//     return cart;
// }

// // Add an item to the user's cart
// async function addCartItem(userId, req) {
//     // Fetch the user using Auth0 ID
//     const user = await User.findOne({ auth0Id: userId });
//     if (!user) {
//         throw new Error(`User not found with id: ${userId}`);
//     }

//     // Fetch the user's cart
//     let cart = await Cart.findOne({ user: user._id });
//     if (!cart) {
//         // Create a cart if one does not exist
//         cart = await createCart(user._id);
//     }

//     // Fetch the product being added
//     const product = await Product.findById(req.productId);
//     if (!product) {
//         throw new Error("Product not found");
//     }

//     // Check if the product already exists in the cart
//     const existingCartItem = await CartItem.findOne({
//         cart: cart._id,
//         product: product._id,
//         userId: user._id,
//     });

//     if (!existingCartItem) {
//         // Add new item to the cart
//         const cartItem = new CartItem({
//             product: product._id,
//             cart: cart._id,
//             quantity: 1,
//             userId: user._id,
//             price: product.discountedPrice,
//             size: req.size,
//             discountedPrice: product.discountedPrice,
//         });

//         const createdCartItem = await cartItem.save();
//         cart.cartItems.push(createdCartItem);
//         await cart.save();
//     } else {
//         // Update quantity if item already exists
//         existingCartItem.quantity += 1;
//         await existingCartItem.save();
//     }

//     return "Item added to cart";
// }

// module.exports = { createCart, findUserCart, addCartItem };
