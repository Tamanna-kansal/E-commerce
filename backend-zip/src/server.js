require('dotenv').config();

const { app } = require(".");
const { connectDb } = require("./config/db");

const PORT = process.env.PORT || 5454;

const startServer = async () => {
    try {
        await connectDb();
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`E-commerce API listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit process with failure
    }
};

startServer();
