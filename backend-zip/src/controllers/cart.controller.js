// const express=require("express");
// const router=express.Router();

// const cartService=require("../services/cart.service.js");



// const findUserCart = async (req, res) => {
//     try {
//       const user = req.user;
//       const cart = await cartService.findUserCart(user.id);
//       res.status(200).json(cart);
//     } catch (error) {
//       // Handle error here and send appropriate response
//       res.status(500).json({ message: "Failed to get user cart.", error: error.message });
//     }
// }
  

//   const addItemToCart = async (req, res) => {
//     try {
//       const user = req.user;
//       await cartService.addCartItem(user._id.toString(), req.body);
     
//       res.status(202).json({message:"Item Added To Cart Successfully", status:true});
//     } catch (error) {
//       // Handle error here and send appropriate response
//       res.status(500).json({ message: "Failed to add item to cart.", error: error.message });
//     }
//   }

//   module.exports={findUserCart,addItemToCart};

const express = require("express");
const router = express.Router();
const cartService = require("../services/cart.service.js");

// Find a user's cart and update cart details
const findUserCart = async (req, res) => {
    try {
        // Use the correct user ID based on the authentication method (JWT or Auth0)
        const userId = req.user?.sub || req.user?._id;  // Auth0 uses 'sub' while custom JWT uses '_id'
        
        if (!userId) {
            return res.status(400).json({ message: "User ID not found in request." });
        }

        const cart = await cartService.findUserCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Failed to get user cart.", error: error.message });
    }
}

// Add an item to the user's cart
const addItemToCart = async (req, res) => {
    try {
        // Use the correct user ID based on the authentication method (JWT or Auth0)
        const userId = req.user?.sub || req.user?._id;  // Auth0 uses 'sub' while custom JWT uses '_id'

        if (!userId) {
            return res.status(400).json({ message: "User ID not found in request." });
        }

        await cartService.addCartItem(userId, req.body);
        res.status(202).json({ message: "Item Added To Cart Successfully", status: true });
    } catch (error) {
        res.status(500).json({ message: "Failed to add item to cart.", error: error.message });
    }
}

module.exports = { findUserCart, addItemToCart };
