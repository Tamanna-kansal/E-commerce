// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/user.model.js');
// const jwtProvider=require("../config/jwtProvider")

// const createUser = async (userData)=>{
//     try {

//         let {firstName,lastName,email,password,role}=userData;

//         const isUserExist=await User.findOne({email});


//         if(isUserExist){
//             throw new Error("user already exist with email : ",email)
//         }

//         password=await bcrypt.hash(password,8);
    
//         const user=await User.create({firstName,lastName,email,password,role})

//         console.log("user ",user)
    
//         return user;
        
//     } catch (error) {
//         console.log("error - ",error.message)
//         throw new Error(error.message)
//     }

// }

// const findUserById=async(userId)=>{
//     try {
//         const user = await User.findById(userId);
//         if(!user){
//             throw new Error("user not found with id : ",userId)
//         }
//         return user;
//     } catch (error) {
//         console.log("error :------- ",error.message)
//         throw new Error(error.message)
//     }
// }

// const getUserByEmail=async(email)=>{
//     try {

//         const user=await User.findOne({email});

//         if(!user){
//             throw new Error("user found with email : ",email)
//         }

//         return user;
        
//     } catch (error) {
//         console.log("error - ",error.message)
//         throw new Error(error.message)
//     }
// }

// const getUserProfileByToken=async(token)=>{
//     try {

//         const userId=jwtProvider.getUserIdFromToken(token)

//         console.log("userr id ",userId)


//         const user= (await findUserById(userId)).populate("addresses");
//         user.password=null;
        
//         if(!user){
//             throw new Error("user not exist with id : ",userId)
//         }
//         return user;
//     } catch (error) {
//         console.log("error ----- ",error.message)
//         throw new Error(error.message)
//     }
// }

// const getAllUsers=async()=>{
//     try {
//         const users=await User.find();
//         return users;
//     } catch (error) {
//         console.log("error - ",error)
//         throw new Error(error.message)
//     }
// }
// const findOrCreateUserFromAuth0 = async (auth0User) => {
//     try {
//         const { sub, email, given_name, family_name } = auth0User;

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         // If user doesn't exist, create one
//         if (!user) {
//             user = await User.create({
//                 firstName: given_name || "Auth0",
//                 lastName: family_name || "User",
//                 email,
//                 password: "N/A", // Auth0 handles passwords, so this can be skipped
//                 role: "CUSTOMER",
//             });
//         }

//         return user;
//     } catch (error) {
//         console.error("Error syncing Auth0 user:", error.message);
//         throw new Error("Failed to sync user with Auth0.");
//     }
// };

// module.exports = {
//     createUser,
//     findUserById,
//     getUserProfileByToken,
//     getUserByEmail,
//     getAllUsers,
//     findOrCreateUserFromAuth0, // Add this export
// };


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const jwtProvider = require('../config/jwtProvider');
const cartService = require('../services/cart.service.js');  // Import cartService


const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password, role } = userData;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error(`User already exists with email: ${email}`);
        }

        password = await bcrypt.hash(password, 8);

        const user = await User.create({ firstName, lastName, email, password, role });

        console.log('User created successfully:', user);

        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error(error.message);
    }
};

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }
        return user;
    } catch (error) {
        console.error('Error finding user by ID:', error.message);
        throw new Error(error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error(`No user found with email: ${email}`);
        }

        return user;
    } catch (error) {
        console.error('Error finding user by email:', error.message);
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);

        console.log('User ID from token:', userId);

        const user = await User.findById(userId).populate('addresses', '-password'); // Exclude password in the query
        if (!user) {
            throw new Error(`User does not exist with id: ${userId}`);
        }

        return user;
    } catch (error) {
        console.error('Error getting user profile by token:', error.message);
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find({}, '-password'); // Exclude passwords
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error.message);
        throw new Error(error.message);
    }
};

// const findOrCreateUserFromAuth0 = async (auth0User) => {
//     try {
//         // Log the entire auth0User object to see its structure
//         console.log("Auth0 User Profile:", auth0User);

//         const {
//             sub: auth0Id,         // Auth0 ID
//             name: { givenName: firstName = "Auth0", familyName: lastName = "User" } = {}, // Extract names from the 'name' object
//             emails = []           // Emails array
//         } = auth0User;

//         const email = emails[0]?.value; // Safely extract email

//         // Validate email presence
//         if (!email) {
//             throw new Error("Auth0 user data is missing the required email field.");
//         }

//         // Log the extracted fields
//         console.log("Extracted firstName:", firstName);
//         console.log("Extracted lastName:", lastName);
//         console.log("Full Name:", firstName + " " + lastName);

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         // If user doesn't exist, create one
//         if (!user) {
//             user = await User.create({
//                 firstName,
//                 lastName,
//                 email,
//                 password: "N/A", // Auth0 handles authentication
//                 role: "CUSTOMER",
//             });
//             console.log("New user created:", user);
//         }

//         return user;
//     } catch (error) {
//         console.error("Error syncing Auth0 user:", error.message);
//         throw new Error("Failed to sync user with Auth0.");
//     }
// };
// const findOrCreateUserFromAuth0 = async (auth0User) => {
//     try {
//         // Log the entire auth0User object to see its structure
//         console.log("Auth0 User Profile:", auth0User);

//         const {
//             sub: auth0Id,         // Auth0 ID
//             name: { givenName: firstName = "Auth0", familyName: lastName = "User" } = {}, // Extract names from the 'name' object
//             emails = []           // Emails array
//         } = auth0User;

//         const email = emails[0]?.value; // Safely extract email

//         // Validate email presence
//         if (!email) {
//             throw new Error("Auth0 user data is missing the required email field.");
//         }

//         // Log the extracted fields
//         console.log("Extracted firstName:", firstName);
//         console.log("Extracted lastName:", lastName);
//         console.log("Full Name:", firstName + " " + lastName);

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         // If user doesn't exist, create one
//         if (!user) {
//             user = await User.create({
//                 firstName,
//                 lastName,
//                 email,
//                 password: "N/A", // Auth0 handles authentication
//                 role: "CUSTOMER",
//             });
//             console.log("New user created:", user);
//         }

//         // Create a cart for the new user (if they don't have one)
//         // You can directly create the cart here
//         await cartService.createCart(user);

//         return user;
//     } catch (error) {
//         console.error("Error syncing Auth0 user:", error.message);
//         throw new Error("Failed to sync user with Auth0.");
//     }
// };
const findOrCreateUserFromAuth0 = async (auth0User) => {
    try {
        // Log the entire auth0User object to see its structure
        console.log("Auth0 User Profile:", auth0User);

        const {
            sub: auth0Id,         // Auth0 ID
            name: { givenName: firstName = "Auth0", familyName: lastName = "User" } = {}, // Extract names from the 'name' object
            emails = []           // Emails array
        } = auth0User;

        const email = emails[0]?.value; // Safely extract email

        // Validate email presence
        if (!email) {
            throw new Error("Auth0 user data is missing the required email field.");
        }

        // Log the extracted fields
        console.log("Extracted firstName:", firstName);
        console.log("Extracted lastName:", lastName);
        console.log("Full Name:", firstName + " " + lastName);

        // Check if user already exists
        let user = await User.findOne({ email });

        // If user doesn't exist, create one
        if (!user) {
            user = await User.create({
                firstName,
                lastName,
                email,
                password: "N/A", // Auth0 handles authentication
                role: "CUSTOMER",
            });
            console.log("New user created:", user);
        }

        // Create a cart for the new user (if they don't have one)
        const createdCart = await cartService.createCart(user);

        // Log the cart creation process
        console.log(`Cart created for user: ${user._id}`, createdCart);
        
        return user;
    } catch (error) {
        console.error("Error syncing Auth0 user:", error.message);
        throw new Error("Failed to sync user with Auth0.");
    }
};


module.exports = {
    createUser,
    findUserById,
    getUserProfileByToken,
    getUserByEmail,
    getAllUsers,
    findOrCreateUserFromAuth0,
};
