// const userService=require("../services/user.service.js")
// const jwtProvider=require("../config/jwtProvider.js")
// const bcrypt=require("bcrypt")
// const cartService=require("../services/cart.service.js")


// const register=async(req,res)=>{

//     try {
//         const user=await userService.createUser(req.body);
//         const jwt=jwtProvider.generateToken(user._id);

//         await cartService.createCart(user);

//         return res.status(200).send({jwt,message:"register success"})

//     } catch (error) {
//         return res.status(500).send({error:error.message})
//     }
// }
// const login=async(req,res)=>{
//     const {password,email}=req.body
//     try {
//         const user = await userService.getUserByEmail(email);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found With Email ', email});
//         }

//         const isPasswordValid=await bcrypt.compare(password,user.password)

//         if(!isPasswordValid){
//             return res.status(401).json({ message: 'Invalid password' });
//         }

//         const jwt=jwtProvider.generateToken(user._id);

//         return res.status(200).send({jwt,message:"login success"});

//     } catch (error) {
//         return res.status(500).send({error:error.message})
//     }
// }
// module.exports={register,login}
const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service.js");

// Register User
const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        // Create a cart for the new user
        await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "Registration successful" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Login User
const login = async (req, res) => {
    const { password, email } = req.body;

    try {
        // Fetch user by email
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: `User not found with email: ${email}` });
        }

        // Compare hashed passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT
        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: "Login successful" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { register, login };
