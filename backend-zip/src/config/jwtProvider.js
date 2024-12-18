// require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const SECRET_KEY=process.env.SECRET_KEY

// const generateToken=(userId)=>{

//     const token=jwt.sign({userId},SECRET_KEY,{ expiresIn: '48h' })
//     return token;
// }

// const getUserIdFromToken=(token)=>{
//     const decodedToken=jwt.verify(token,SECRET_KEY)
//     return decodedToken.userId
// }


// module.exports={generateToken,getUserIdFromToken};
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Generate Token
const generateToken = (userId) => {
    const token = jwt.sign(
        { userId }, 
        SECRET_KEY, 
        { algorithm: 'HS256', expiresIn: '48h' } // Use HS256 unless you have a private/public key pair
    );
    return token;
};

// Decode Token to Extract User ID
const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] });
    return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
