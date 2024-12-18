// const { auth } = require('express-oauth2-jwt-bearer');

// const auth0Authenticate = auth({
//     audience: process.env.AUTH0_AUDIENCE,
//     issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
// });

// module.exports = auth0Authenticate;

// const { auth } = require('express-oauth2-jwt-bearer');
// const userService = require('../services/user.service');  // Assuming you have a service to fetch the user

// const auth0Authenticate = auth({
//     audience: process.env.AUTH0_AUDIENCE,
//     issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
// });

// // Add a custom middleware to attach user information
// const attachUserFromAuth0 = async (req, res, next) => {
//     try {
//         const decodedToken = req.auth;  // `express-oauth2-jwt-bearer` middleware adds the decoded token to the request
//         if (!decodedToken || !decodedToken.sub) {
//             return res.status(401).send({ message: "Invalid Auth0 token" });
//         }

//         const userId = decodedToken.sub;  // `sub` is the unique identifier in Auth0 tokens
//         const user = await userService.findUserById(userId);

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         req.user = user;  // Attach user to the request object
//         next();
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

// module.exports = [auth0Authenticate, attachUserFromAuth0];


// const { auth } = require('express-oauth2-jwt-bearer');
// const userService = require('../services/user.service');

// const auth0Authenticate = auth({
//     audience: process.env.AUTH0_AUDIENCE,
//     issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
//     algorithms: ['RS256'], // Specify expected algorithm
// });

// // Attach user info
// const attachUserFromAuth0 = async (req, res, next) => {
//     try {
//         const decodedToken = req.auth; // Decoded token from middleware
//         if (!decodedToken || !decodedToken.sub) {
//             return res.status(401).send({ message: 'Invalid Auth0 token' });
//         }

//         const userId = decodedToken.sub; // Unique identifier from Auth0
//         const user = await userService.findUserById(userId);

//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error('Error attaching user:', error.message);
//         return res.status(500).send({ error: error.message });
//     }
// };

// module.exports = [auth0Authenticate, attachUserFromAuth0];

const { auth } = require('express-oauth2-jwt-bearer');
const userService = require('../services/user.service');

const auth0Authenticate = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
});

// Middleware to attach user info from Auth0
const attachUserFromAuth0 = async (req, res, next) => {
    try {
        const decodedToken = req.auth; // Decoded token from the `auth0Authenticate` middleware
        if (!decodedToken || !decodedToken.sub) {
            return res.status(401).json({ message: 'Invalid or missing Auth0 token' });
        }

        const userId = decodedToken.sub; // Unique identifier for the user from Auth0
        const user = await userService.findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found in the database' });
        }

        req.user = user; // Attach user object to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error attaching user:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = [auth0Authenticate, attachUserFromAuth0];
