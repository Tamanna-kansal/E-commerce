const auth0Authenticate = require('./auth0Authenticate');
const customAuthenticate = require('./authenticat');

// const authMiddleware = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             return res.status(401).json({ message: "Authorization header missing" });
//         }

//         const token = authHeader.split(" ")[1];

//         // Check if the token is from Auth0
//         if (token && token.includes(process.env.AUTH0_DOMAIN)) {
//             return auth0Authenticate(req, res, next); // Use Auth0 authentication
//         }

//         // Otherwise, use custom JWT validation
//         return customAuthenticate(req, res, next); // Use custom authentication
//     } catch (error) {
//         console.error("Middleware error:", error.message);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const Token = authHeader.split(" ")[1];

        // Check if the jwt is from Auth0
        if (Token && Token.includes(process.env.AUTH0_DOMAIN)) {
            return auth0Authenticate(req, res, next); // Use Auth0 authentication
        }

        // Otherwise, use custom JWT validation
        return customAuthenticate(req, res, next); // Use custom authentication
        
    } catch (error) {
        console.error("Middleware error:", error.message);
        return res.status(500).json({ message: "Authentication error", details: error.message });
    }
};

module.exports = authMiddleware;
