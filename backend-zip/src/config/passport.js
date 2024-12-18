// const passport = require('passport');
// const { Strategy } = require('passport-auth0');
// const auth0Config = require('./auth0Provider');

// if (!auth0Config.domain || !auth0Config.clientId || !auth0Config.clientSecret) {
//     throw new Error(
//         'Auth0 configuration is invalid. Please ensure the following environment variables are set correctly: ' +
//         `AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_CLIENT_SECRET`
//     );
// }

// passport.use(
//     new Strategy(
//         {
//             domain: auth0Config.domain,
//             clientID: auth0Config.clientId,
//             clientSecret: auth0Config.clientSecret,
//             callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5454/auth/auth0/callback', // Fallback to local callback
//         },
//         (accessToken, refreshToken, extraParams, profile, done) => {
//             try {
//                 console.log('Auth0 profile received:', {
//                     id: profile.id,
//                     name: profile.displayName,
//                     email: profile.emails?.[0]?.value,
//                 });
//                 return done(null, profile);
//             } catch (err) {
//                 console.error('Error in Auth0 strategy:', err);
//                 return done(err, null);
//             }
//         }
//     )
// );

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// module.exports = passport;


const passport = require('passport');
const { Strategy } = require('passport-auth0');
const auth0Config = require('./auth0Provider');

if (!auth0Config.domain || !auth0Config.clientId || !auth0Config.clientSecret) {
    throw new Error(
        'Auth0 configuration is invalid. Please ensure the following environment variables are set correctly: ' +
        `AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_CLIENT_SECRET`
    );
}

// passport.use(
//     new Strategy(
//         {
//             domain: auth0Config.domain,
//             clientID: auth0Config.clientId,
//             clientSecret: auth0Config.clientSecret,
//             callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5454/auth/auth0/callback',
//         },
//         (accessToken, refreshToken, extraParams, profile, done) => {
//             try {
//                 // Log basic profile details
//                 console.log('Auth0 profile received:', {
//                     id: profile.id,
//                     name: profile.displayName,
//                     email: profile.emails?.[0]?.value,
//                 });

//                 // Process the user profile as needed
//                 return done(null, profile);
//             } catch (err) {
//                 console.error('Error in Auth0 strategy:', err.message);
//                 return done(err, null);
//             }
//         }
//     )
// );
passport.use(
    new Strategy(
        {
            domain: auth0Config.domain,
            clientID: auth0Config.clientId,
            clientSecret: auth0Config.clientSecret,
            callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:5454/auth/auth0/callback',
            scope: 'openid email profile',
            passReqToCallback: true,
            prompt: 'login', // Force the login screen to appear
        },
        async (req, accessToken, refreshToken, extraParams, profile, done) => {
            try {
                // Log basic profile details
                console.log('Auth0 profile received:', {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                });

                // Process the user profile as needed
                return done(null, profile);
            } catch (err) {
                console.error('Error in Auth0 strategy:', err.message);
                return done(err, null);
            }
        }
    )
);


// Serialize user into the session
passport.serializeUser((user, done) => {
    // Store only essential data (e.g., user ID or email)
    done(null, { id: user.id, email: user.emails?.[0]?.value });
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    // Reattach the user info as needed (for simple cases, return as-is)
    done(null, user);
});

module.exports = passport;
