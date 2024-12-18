// const express=require("express");

// const router=express.Router();


// module.exports=router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { auth0Config } = require("../config/auth0Provider");
const authController = require("../controllers/auth.controller.js");

// Existing signup and signin endpoints
router.post("/signup", authController.register);
router.post("/signin", authController.login);

// router.get("/test", (req, res) => {
//     res.status(200).send("Test route is working!");
// });

// Auth0 login route
// router.get(
//     "/auth0/login",
//     passport.authenticate("auth0", { scope: "openid email profile" })
// );
router.get(
    "/auth0/login",
    passport.authenticate("auth0", {
        scope: "openid email profile",
        prompt: "login", // This forces the login screen every time
    })
);


// // Auth0 callback route
// router.get("/auth0/callback", (req, res, next) => {
//     passport.authenticate("auth0", async (err, user, info) => {
//         if (err) return next(err);
//         if (!user) return res.redirect("/login");

//         // Find or create user in your database
//         const dbUser = await userService.findOrCreateUserFromAuth0(user);

//         // Generate a JWT for the frontend
//         const token = jwt.sign({ userId: dbUser._id }, process.env.SECRET_KEY, {
//             expiresIn: "48h",
//         });

//         return res.status(200).json({ message: "Auth0 login success", token });
//     })(req, res, next);
// });

router.get("/auth0/callback", (req, res, next) => {
    passport.authenticate("auth0", async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect("/login");

        try {
            // Find or create user in your database
            const dbUser = await userService.findOrCreateUserFromAuth0(user);

            // Generate a JWT for the frontend
            const token = jwt.sign({ userId: dbUser._id }, process.env.SECRET_KEY, {
                expiresIn: "48h",
            });
            // return res.status(200).json({ message: "Auth0 login success", token });  
            return res.redirect(
                // `http://localhost:3000/auth/callback?token=${encodeURIComponent(token)}`
                `http://localhost:3000/auth/callback?token=${encodeURIComponent(token)}`
            );
        } catch (error) {
            console.error("Auth0 callback error:", error.message);
            return res.status(500).send({ message: "Internal server error during Auth0 login" });
        }
    })(req, res, next);
});

// // Auth0 logout route
// router.get("/auth0/logout", (req, res) => {
//     req.logout(() => {
//         res.redirect(
//             `https://${auth0Config.domain}/v2/logout?client_id=${auth0Config.clientId}`
//         );
//     });
// });
router.get("/auth0/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.error("Logout error:", err.message);

        res.redirect(
            `https://${auth0Config.domain}/v2/logout?client_id=${auth0Config.clientId}&returnTo=http://localhost:3000`
            // `https://${auth0Config.domain}/v2/logout?client_id=${auth0Config.clientId}`
        );
    });
});

module.exports = router;
