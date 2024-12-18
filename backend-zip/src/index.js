const express = require("express");
const cors = require('cors');
const passport = require('./config/passport');
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(express.json());

// CORS: Set specific origins or allow all (for dev)
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', // For development, or specify allowed frontend domains in production
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type, Authorization' // Set allowed headers
};
app.use(cors(corsOptions));

// Add session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY, // Corrected variable name
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only set 'secure' in production
            maxAge: 24 * 60 * 60 * 1000 // Set session expiration (1 day)
        }
    })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Basic route
app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to ecommerce API - Node" });
});

// Routers
const authRouter = require("./routes/auth.routes.js");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes.js");
app.use("/api/users", userRouter);

const productRouter = require("./routes/product.routes.js");
app.use("/api/products", productRouter);

const adminProductRouter = require("./routes/product.admin.routes.js");
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./routes/cart.routes.js");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.routes.js");
app.use("/api/cart_items", cartItemRouter);

const orderRouter = require("./routes/order.routes.js");
app.use("/api/orders", orderRouter);

const paymentRouter = require("./routes/payment.routes.js");
app.use('/api/payments', paymentRouter);

const reviewRouter = require("./routes/review.routes.js");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating.routes.js");
app.use("/api/ratings", ratingRouter);

// Admin routes handler
const adminOrderRoutes = require("./routes/adminOrder.routes.js");
app.use("/api/admin/orders", adminOrderRoutes);

module.exports = { app };
